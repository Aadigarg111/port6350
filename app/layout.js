import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

export const metadata = {
  title: "Swayam Swarup Panda | Frontend Developer",
  description:
    "I craft intelligent, interactive user interfaces using modern web technologies like React, Next.js, and Tailwind.",
  keywords:
    "Frontend Developer, React, Next.js, Web Development, Redux, JavaScript, TypeScript, Portfolio, Tailwind, GSAP, Swayam Swarup Panda",
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "Swayam Swarup Panda | Frontend Developer",
    description:
      "Interactive and performant web experiences with cutting-edge frontend tech.",
    url: "https://yourdomain.com",
    siteName: "Swayam's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swayam's Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Swayam Swarup Panda | Frontend Developer",
    description: "Interactive and performant web experiences.",
    creator: "@Swayam_Dev",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
