import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Journal Guru",
  description: "Generate personalized journal prompts tailored to your life situation, age, and philosophical perspective.",
  icons: {
    icon: "journal-guru-logo.jpg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          strategy='lazyOnload'
          src={`https://www.googletagmanager.com/gtag/js?id=G-DJF5D5KP4L`}
        />
        <script id='' strategy='lazyOnload'>
          {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DJF5D5KP4L', {
                page_path: window.location.pathname,
                });
            `}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
