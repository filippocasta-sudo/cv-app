import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Syne } from "next/font/google";
import { ModeProvider } from "@/context/ModeContext";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filippo Castagna — IT Omnichannel Delivery Specialist",
  description:
    "CV interattivo di Filippo Castagna: delivery omnicanale, coordinamento AMS e project management. Versione schietta o CV formale classico.",
  openGraph: {
    title: "Filippo Castagna — IT Omnichannel Delivery Specialist",
    description:
      "CV interattivo: esperienze, competenze, obiettivi di carriera e limiti dichiarati senza giri di parole.",
    type: "profile",
    locale: "it_IT",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#121411" },
  ],
};

/** Applies the stored theme before first paint to avoid a flash of light mode. */
const themeBootstrap = `(function(){try{var s=localStorage.getItem('cv-theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${syne.variable} ${atkinson.variable}`}>
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
