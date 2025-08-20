import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// Importe as imagens do seu favicon
// Certifique-se de que os arquivos estão na pasta `public`
// Exemplo: /public/favicon.ico, /public/apple-icon.png, etc.
import faviconIco from "/public/favicon.ico";
import appleIcon from "/public/apple-touch-icon.png";
import androidIcon from "/public/android-chrome-192x192.png";

export const metadata: Metadata = {
  title: "Caseirinhos da Amália",
  description:
    "Bolos caseiros e cake donuts, sempre fresquinhos, direto da minha casa para a sua casa!!! Melhores bolos caseiros de Caçapava, são paulo!",
  generator: "v0.dev",

  verification: {
    google: "FL5TWL-hbBPVxqHINwVQFnmWu_cUrRmw0LM8tXcxibs",
  },

  // Use o campo 'icons' para adicionar os ícones
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // Favicon padrão
      { url: "/android-chrome-192x192.png", sizes: "192x192" }, // Ícone Android
    ],
    shortcut: "/favicon.ico", // Ícone de atalho
    apple: "/apple-touch-icon.png", // Ícone para iOS
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          As tags <link> para os ícones serão geradas
          automaticamente a partir do objeto 'metadata'
        */}
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
