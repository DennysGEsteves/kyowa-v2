import { QueryProvider } from "@/contexts/query-client-provider";
import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { FeedbackDialogProvider } from "@/contexts/FeedbackDialog";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyowa — Administração",
  description: "Painel administrativo Kyowa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <QueryProvider>
          <FeedbackDialogProvider>{children}</FeedbackDialogProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
