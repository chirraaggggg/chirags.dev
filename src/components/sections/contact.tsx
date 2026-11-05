"use client";

import { Mail } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState, useTransition } from "react";

import { sendPostcard } from "@/app/actions/contact";
import { Icons } from "@/components/icons";
import { Magnetic } from "@/components/ui/folio/magnetic";
import { FOLIO } from "@/config/folio";

const socials = [
  { label: "Email", href: `mailto:${FOLIO.email}`, icon: Mail },
  { label: "LinkedIn", href: FOLIO.linkedinUrl, icon: Icons.linkedin },
  { label: "X", href: FOLIO.xUrl, icon: Icons.x },
  { label: "GitHub", href: FOLIO.githubUrl, icon: Icons.github },
];

type Stage = "idle" | "sending" | "flying" | "sent";

export function Contact() {
  const [stage, setStage] = useState<Stage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [pending, startTransition] = useTransition();

  const sectionRef = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const onTilt = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 9);
    rotateX.set(py * -7);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (stage !== "idle") return;
    setError(null);
    setStage("sending");

    startTransition(async () => {
      const result = await sendPostcard({ message, email, company });
      if (!result.ok) {
        setError(result.error ?? "Something went wrong.");
        setStage("idle");
        return;
      }
      setStage("flying");
      window.setTimeout(() => setStage("sent"), 1000);
    });
  };

  const writeAnother = () => {
    setMessage("");
    setEmail("");
    setError(null);
    setStage("idle");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden pb-16"
      aria-label="Contact"
    >
      <div className="folio-hairline mx-auto flex w-full max-w-[1180px] items-center justify-between px-5 pt-5 font-code text-[9px] tracking-[0.2em] text-ink/40 uppercase sm:px-8 sm:text-[10px]">
        <span>(05) Contact</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-1 rounded-full bg-ink/50" />
          Open inbox
        </span>
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="folio-italic max-w-[760px] text-[clamp(2.4rem,7.2vw,5.4rem)] leading-[1.02]"
          >
            Thanks for
            <br />
            stopping by<span className="text-ink/40">.</span>
          </motion.h2>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={social.label}
                    className="group flex size-9 items-center justify-center rounded-full border border-dashed border-ink/35 text-ink/55 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
            <a
              href={`mailto:${FOLIO.email}`}
              className="folio-link font-code text-[9px] tracking-[0.14em] text-ink/45 uppercase"
            >
              {FOLIO.email}
            </a>
            <p className="font-code text-[9px] tracking-[0.14em] text-ink/30 uppercase">
              Replies within 48h · no calendly
            </p>
          </div>
        </div>

        <div className="perspective-[1400px] mt-12 sm:mt-16">
          <motion.div
            onPointerMove={onTilt}
            onPointerLeave={resetTilt}
            style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
            className="mx-auto w-full max-w-[820px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {stage === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 24, rotateX: -8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="folio-card folio-grain flex min-h-[420px] flex-col items-center justify-center gap-5 px-8 py-16 text-center"
                >
                  <div className="relative z-[2] flex size-16 items-center justify-center rounded-full border border-dashed border-ink/40">
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                      className="font-serif text-[26px]"
                    >
                      ✓
                    </motion.span>
                  </div>
                  <p className="folio-italic relative z-[2] text-[clamp(1.8rem,5vw,2.8rem)] leading-tight">
                    Folded, stamped, sent.
                  </p>
                  <p className="relative z-[2] max-w-sm text-[13px] leading-relaxed text-ink/55">
                    Thanks for writing. I read every postcard myself — expect a reply at{" "}
                    <span className="font-code text-[11px] text-ink/75">{email || "your inbox"}</span>{" "}
                    within a couple of days.
                  </p>
                  <button
                    type="button"
                    onClick={writeAnother}
                    className="relative z-[2] mt-2 font-code text-[9px] tracking-[0.18em] text-ink/45 uppercase underline decoration-dashed underline-offset-4 transition-colors hover:text-ink"
                  >
                    Write another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  animate={
                    stage === "flying"
                      ? { x: 280, y: -240, rotate: 13, scale: 0.9, opacity: 0, rotateX: 55 }
                      : stage === "sending"
                        ? { rotateX: 12, y: -4 }
                        : { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, rotateX: 0 }
                  }
                  transition={{ duration: stage === "flying" ? 0.9 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="folio-card folio-grain relative grid min-h-[440px] overflow-hidden md:grid-cols-[1.15fr_0.85fr]"
                >
                  {/* Message side */}
                  <div className="relative z-[2] flex flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="folio-eyebrow text-ink/40">Message / 01</span>
                      <span className="font-code text-[8px] tracking-[0.14em] text-ink/25 uppercase">
                        {message.length}/4000
                      </span>
                    </div>

                    <label htmlFor="postcard-message" className="sr-only">
                      Your message
                    </label>
                    <textarea
                      id="postcard-message"
                      name="message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                      minLength={10}
                      maxLength={4000}
                      rows={5}
                      placeholder="Write me something worth reading…"
                      className="folio-italic mt-4 w-full flex-1 resize-none bg-transparent text-[clamp(1.15rem,2.4vw,1.5rem)] leading-relaxed text-ink placeholder:text-ink/30 focus:outline-none"
                    />

                    <div className="mt-4 border-t border-dashed border-ink/25 pt-4">
                      <label
                        htmlFor="postcard-email"
                        className="folio-eyebrow block text-ink/40"
                      >
                        From
                      </label>
                      <div className="mt-1 flex items-center gap-2 border-b border-dashed border-ink/30 pb-1 focus-within:border-ink">
                        <span className="font-code text-[12px] text-ink/35">@</span>
                        <input
                          id="postcard-email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          required
                          placeholder="you@somewhere.com"
                          className="w-full bg-transparent py-1 font-code text-[12px] tracking-wide text-ink placeholder:text-ink/30 focus:outline-none"
                        />
                      </div>
                      {/* honeypot */}
                      <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] size-px opacity-0"
                      />
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          role="alert"
                          className="mt-3 font-code text-[10px] tracking-wide text-ink"
                        >
                          ⚠ {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Address / stamp side */}
                  <div className="relative z-[2] flex flex-col justify-between border-t border-dashed border-ink/25 p-6 md:border-t-0 md:border-l sm:p-8">
                    <div className="flex justify-between gap-4">
                      <div className="max-w-[150px] font-code text-[8.5px] leading-[1.9] tracking-[0.12em] text-ink/40 uppercase">
                        To
                        <br />
                        <span className="text-ink/70">{FOLIO.fullName}</span>
                        <br />
                        Gurugram, Haryana
                        <br />
                        India — 122002
                      </div>

                      <div className="relative">
                        <div className="flex h-[86px] w-[68px] rotate-3 flex-col items-center justify-center gap-1 border border-dashed border-ink/40 bg-paper-sunken/60 p-1.5 text-center">
                          <span className="font-code text-[5px] tracking-[0.14em] text-ink/45 uppercase">
                            India Post
                          </span>
                          <span className="folio-display text-[22px] leading-none text-ink/80">
                            C
                          </span>
                          <span className="font-code text-[6px] tracking-wide text-ink/50">
                            ₹5.00
                          </span>
                        </div>
                        <div
                          aria-hidden="true"
                          className="absolute -top-5 -right-6 flex size-[76px] -rotate-12 items-center justify-center rounded-full border border-dashed border-ink/30 text-center"
                        >
                          <span className="font-code text-[5px] leading-[1.5] tracking-[0.08em] text-ink/35 uppercase">
                            Gurugram
                            <br />
                            04 Nov 2026
                            <br />
                            122002
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <p className="folio-italic text-[15px] leading-snug text-ink/50">
                        “The best things I’ve built started as a message like this.”
                      </p>

                      <Magnetic strength={0.18}>
                        <button
                          type="submit"
                          disabled={pending || stage === "sending" || stage === "flying"}
                          className="group flex w-full items-center justify-between rounded-full border border-dashed border-ink px-4 py-2.5 font-code text-[10px] tracking-[0.14em] text-ink uppercase transition-colors duration-300 hover:bg-ink hover:text-paper disabled:cursor-wait disabled:opacity-60"
                        >
                          {stage === "sending" || stage === "flying"
                            ? "Folding postcard…"
                            : "Send postcard"}
                          <span className="flex size-5 items-center justify-center rounded-full border border-current transition-transform duration-300 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        </button>
                      </Magnetic>

                      <p className="text-center font-code text-[7.5px] tracking-[0.14em] text-ink/25 uppercase">
                        No newsletter · no CRM · just email
                      </p>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <ContactDot />
    </section>
  );
}

/** A slow dot that trails the pointer inside the contact section. */
function ContactDot() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 40, damping: 18, mass: 1.2 });
  const springY = useSpring(y, { stiffness: 40, damping: 18, mass: 1.2 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const section = document.getElementById("contact");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      setVisible(inside);
      if (!inside) return;
      x.set(event.clientX - rect.left);
      y.set(event.clientY - rect.top);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
    >
      <motion.span
        style={{ x: springX, y: springY }}
        animate={{ opacity: visible ? 0.55 : 0 }}
        className="absolute top-0 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
      />
    </div>
  );
}
