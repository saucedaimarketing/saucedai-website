import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const TITLE = "Sauced — AI-Powered Restaurant Growth";
const DESCRIPTION =
  "Sauced turns your restaurant's story into content people crave — deep research, a full growth strategy, and shoot-ready scripts, every month.";

export const metadata: Metadata = {
  metadataBase: new URL("https://saucedai.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: [{ url: "/hero-poster.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-fg font-sans">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
