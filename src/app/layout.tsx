import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Plus_Jakarta_Sans } from "next/font/google";
import { ModeProvider } from "@/context/ModeContext";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/** Titoli e sottotitoli — geometrico e leggibile, abbina bene Atkinson. */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

/** Testo corrente — leggibilità e accessibilità. */
const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: "Filippo Castagna — IT Omnichannel Delivery Specialist",
  description:
    "CV interattivo di Filippo Castagna: delivery omnicanale, coordinamento AMS e project management. Versione schietta o CV formale classico.",
  // Deployment and branch hostnames serve the same content, so point every copy
  // at the production domain instead of competing with it in search results.
  alternates: { canonical: "/" },
  openGraph: {
    title: "Filippo Castagna — IT Omnichannel Delivery Specialist",
    description:
      "CV interattivo: esperienze, competenze, obiettivi di carriera e limiti dichiarati senza giri di parole.",
    url: "/",
    siteName: "Filippo Castagna — CV",
    type: "profile",
    locale: "it_IT",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e6eef8" },
    { media: "(prefers-color-scheme: dark)", color: "#1e222d" },
  ],
};

/** Applies the stored theme before first paint to avoid a flash of light mode. */
const themeBootstrap = `(function(){try{var s=localStorage.getItem('cv-theme');var d=s?s==='dark':false;if(d){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${plusJakarta.variable} ${atkinson.variable}`}>
        <ModeProvider>{children}</ModeProvider>
      </body>
    </html>
  );
}
