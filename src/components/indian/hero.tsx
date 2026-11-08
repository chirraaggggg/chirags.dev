import { FOLIO } from "@/config/folio";

export function Hero() {
  return (
    <header className="deshi-hero">
      <p className="deshi-namaste" lang="hi">
        नमस्ते <span>Gurugram · IST</span>
      </p>

      <h1 className="deshi-name">
        {FOLIO.fullName}
        <em>Solo founder · design engineer</em>
      </h1>

      <div className="deshi-intro">
        <p>
          I&rsquo;m Chirag, a solo founder and{" "}
          <a className="deshi-chip" href="#career">
            design engineer
            <span className="deshi-chip-badge">&rsquo;26</span>
          </a>{" "}
          from India.
        </p>
        <p>
          I started out designing interfaces, got obsessed with how software
          actually works, and now build products end to end — the agent runtime,
          the interface, the pricing page, the support inbox at 1am.
        </p>
        <p>
          Right now that&rsquo;s <strong>{FOLIO.currentProject.name}</strong>, an
          AI web design agent. Say hi at{" "}
          <a href={`mailto:${FOLIO.email}`}>{FOLIO.email}</a>, or find me on{" "}
          <a href={FOLIO.xUrl} target="_blank" rel="noreferrer">
            X
          </a>{" "}
          and{" "}
          <a href={FOLIO.githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </header>
  );
}
