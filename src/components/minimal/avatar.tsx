"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FOLIO } from "@/config/folio";

export function Avatar({ href = "/" }: { href?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href={href} aria-label={`${FOLIO.fullName}, home`} className="mp-avatar">
      {failed ? (
        <span className="mp-avatar-glyph" aria-hidden="true">
          {FOLIO.firstName.charAt(0)}
        </span>
      ) : (
        <Image
          src={FOLIO.avatar}
          alt=""
          width={80}
          height={80}
          sizes="80px"
          className="mp-avatar-image"
          onError={() => setFailed(true)}
          priority
        />
      )}
    </Link>
  );
}
