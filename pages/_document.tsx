import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=synonym@400&f[]=amulya@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-pattern">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
