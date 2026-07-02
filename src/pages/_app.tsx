import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Providers } from "@/components/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      enableColorScheme
      storageKey="theme"
    >
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </ThemeProvider>
  );
}
