import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function ChatWidget() {
  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Chat"
    >
      <MessageCircle className="size-6" />
    </Link>
  );
}
