import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function ProfileCover() {
  return (
    <div
      className={cn(
        "aspect-2/1 border-x border-edge select-none sm:aspect-3/1",
        "relative flex flex-col items-center justify-center text-black dark:text-white",
        "bg-black/0.75 dark:bg-white/0.75",
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
      }}
    >
      <p className="text-2xl sm:text-3xl font-bold mb-6">Software Developer.</p>
      <div className="flex gap-4">
        <Link href="mailto:iamchrag182@gmail.com">
          <Button variant="default">Contact Me</Button>
        </Link>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <Button variant="outline">Resume</Button>
        </a>
      </div>
    </div>
  );
}
