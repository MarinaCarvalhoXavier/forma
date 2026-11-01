import type { Metadata } from "next";
import { DM_Serif_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: "600",
  subsets: ["latin"],
});

const title = "Forma — Architecture by one architect";
const description =
  "A concept site for a solo architecture practice: a scroll-driven walk through five clay-model islands, built with generative AI. Start a project.";

export const metadata: Metadata = {
  // Absolute base for the link-preview image (app/opengraph-image.jpg).
  metadataBase: new URL("https://forma-iota-pink.vercel.app"),
  title,
  description,
  openGraph: { title, description, type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
