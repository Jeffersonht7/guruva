import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Guruva | From the São Francisco Valley to the World",
  description:
    "Nova proposta de site institucional e comercial para a Guruva: uvas premium do Vale do São Francisco para o mercado internacional."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Meddon&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
