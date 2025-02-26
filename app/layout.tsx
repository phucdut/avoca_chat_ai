import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatEmbed from "@/components/chat-embed/chat-embed";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALLY AI",
  description:
    "ALLY AI is a cutting-edge technology company specializing in artificial intelligence solutions to drive innovation and efficiency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          id="favicon"
          rel="icon"
          href="/icons/favicon-light.png"
          type="image/png"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const match = window.matchMedia('(prefers-color-scheme: dark)');
                const favicon = document.getElementById('favicon');
                const setFavicon = () => {
                  if (favicon) {
                    favicon.href = match.matches
                      ? '/icons/favicon-light.png'
                      : '/icons/favicon-dark.png';
                  }
                };
                setFavicon();
                match.addEventListener('change', setFavicon);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* <ChatEmbed /> */}
      </body>
    </html>
  );
}
