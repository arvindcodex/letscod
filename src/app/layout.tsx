import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "LetsCod Technologies - Web & Mobile Development, NVMe Cloud Hosting & Coding Bootcamps",
  description:
    "LetsCod Technologies builds bespoke enterprise software, ultra-fast NVMe cloud hosting environments, live certified engineering masterclasses, and virtual industrial internship simulations.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/assets/index-DKdHlKkj.css" />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
        {children}
        <Script src="/assets/index-C4_3w1Pt.js" strategy="afterInteractive" type="module" />
      </body>
    </html>
  );
}
