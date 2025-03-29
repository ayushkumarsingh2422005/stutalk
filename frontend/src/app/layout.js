import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GradeX - Student Result Analysis System",
  description: "Explore your academic stats and get detailed semester-wise analysis with GradeX.",
  keywords: ["NIT Jamshedpur", "NITJSR", "grade analysis", "academic stats", "semester analysis", "student performance", "grade tracking", "NIT-J results", "NITJSR grades", "Jamshedpur engineering college"],
  authors: [{ name: "GradeX Team" }],
  creator: "GradeX Team",
  publisher: "GradeX",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gradex.live",
    title: "GradeX - Student Result Analysis System",
    description: "Explore your academic stats and get detailed semester-wise analysis with GradeX.",
    siteName: "GradeX",
    images: [
      {
        url: "/main_logo.png",
        width: 512,
        height: 512,
        alt: "GradeX Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeX - Student Result Analysis System",
    description: "Explore your academic stats and get detailed semester-wise analysis with GradeX.",
    images: ["/main_logo.png"],
    creator: "@gradex",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  icons: {
    icon: "/main_logo.png",
    shortcut: "/main_logo.png",
    apple: "/main_logo.png",
  },
  manifest: "/manifest.json",
  applicationName: "GradeX",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://gradex.live"),
  alternates: {
    canonical: "https://gradex.live",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GradeX",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/main_logo.png" />
        <link rel="apple-touch-icon" href="/main_logo.png" />
        <link rel="shortcut icon" href="/main_logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
