import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorHalo } from "@/components/CursorHalo";
import { Konami } from "@/components/Konami";
import { AskFrederik } from "@/components/AskFrederik";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Frederik Willemsen — Software & AI engineer",
  description:
    "Computer Science master's student at TUM. Software and AI engineering for production systems — Deloitte, Check24, TUM.ai.",
  metadataBase: new URL("https://frederikwillemsen.dev"),
  openGraph: {
    title: "Frederik Willemsen — Software & AI engineer",
    description:
      "Computer Science master's student at TUM. Software and AI engineering for production systems.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <CursorHalo />
          <Nav />
          <main>{children}</main>
          <Footer />
          <AskFrederik />
          <Konami />
        </ThemeProvider>
      </body>
    </html>
  );
}
