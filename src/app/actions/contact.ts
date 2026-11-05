"use server";

import { headers } from "next/headers";

import { FOLIO } from "@/config/folio";

export type ContactResult = {
  ok: boolean;
  error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort in-memory throttle. Serverless instances are short-lived, so
// this stops casual double-submits rather than real abuse.
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 4;

function throttled(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);
  return hits.length > MAX_PER_WINDOW;
}

export async function sendPostcard(input: {
  message: string;
  email: string;
  company?: string;
}): Promise<ContactResult> {
  const message = input.message?.trim() ?? "";
  const email = input.email?.trim() ?? "";

  // Honeypot — bots fill every field.
  if (input.company) return { ok: true };

  if (message.length < 10) {
    return { ok: false, error: "A few more words, please." };
  }
  if (message.length > 4000) {
    return { ok: false, error: "That is longer than a postcard. Try 4,000 characters." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "That email doesn’t look right." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";

  if (throttled(ip)) {
    return { ok: false, error: "Too many postcards. Give it ten minutes." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? FOLIO.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Chirag Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    // Local development without a key: keep the flow testable.
    console.info("[contact] RESEND_API_KEY missing — would have sent:", { email, message });
    return { ok: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Postcard from ${email}`,
      text: `${message}\n\n—\nReply to: ${email}\nSent from chirags.dev`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text());
    return { ok: false, error: "The postcard got lost. Email me directly instead." };
  }

  return { ok: true };
}
