import type { Metadata } from "next";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const serif = Libre_Baskerville({
  variable: "--font-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sans = Montserrat({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://viradaclinica.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Imersão Virada Clínica · A maior imersão de negócios para clínicas do ES",
  description:
    "Um dia inteiro de imersão para profissionais da saúde com clínica ativa que estão trabalhando muito e crescendo pouco. Gestão, Vendas e Resultado — 01 de agosto, Vila Velha/ES. Apenas 100 vagas.",
  keywords: [
    "imersão para clínicas",
    "negócios para clínicas",
    "gestão de clínica",
    "O Mundo Clínico",
    "Virada Clínica",
    "Espírito Santo",
    "Vila Velha",
  ],
  authors: [{ name: "O Mundo Clínico" }],
  alternates: { canonical: "/imersaoviradaclinica" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/imersaoviradaclinica",
    siteName: "O Mundo Clínico",
    title: "Imersão Virada Clínica · Gestão, Vendas e Resultado",
    description:
      "A maior imersão de negócios para clínicas do Espírito Santo. 01 de agosto · Vila Velha/ES · Apenas 100 vagas.",
    images: [{ url: "/img/hero.png", width: 1191, height: 603, alt: "Imersão Virada Clínica" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imersão Virada Clínica · Gestão, Vendas e Resultado",
    description:
      "A maior imersão de negócios para clínicas do Espírito Santo. 01/08 · Vila Velha/ES.",
    images: ["/img/hero.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body className="antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
