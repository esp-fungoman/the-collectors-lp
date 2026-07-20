import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { FloatingActions } from "@/components/lead/FloatingActions";
import { MenuProvider } from "@/components/nav/MenuProvider";
import { NavMenu } from "@/components/nav/NavMenu";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Collectors | Đại trạch nội đô",
  description:
    "Bộ sưu tập 58 dinh thự độc bản tại Đông Tăng Long, Thành phố Thủ Đức.",
  openGraph: {
    title: "The Collectors | Đại trạch nội đô",
    description:
      "Bộ sưu tập 58 dinh thự độc bản tại Đông Tăng Long, Thành phố Thủ Đức.",
    images: [
      {
        url: "/meta-image.png",
        width: 4800,
        height: 2520,
        alt: "The Collectors' — Đại trạch nội đô, Sưu tầm tinh hiếm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Collectors | Đại trạch nội đô",
    description:
      "Bộ sưu tập 58 dinh thự độc bản tại Đông Tăng Long, Thành phố Thủ Đức.",
    images: ["/meta-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brown-deep text-cream font-sans">
        <MenuProvider>
          {children}
          <NavMenu />
          <FloatingActions />
        </MenuProvider>
      </body>
    </html>
  );
}
