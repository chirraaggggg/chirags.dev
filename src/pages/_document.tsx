import { Head, Html, Main, NextScript } from "next/document";

import { THEME_INIT_SCRIPT } from "@/config/theme-script";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
