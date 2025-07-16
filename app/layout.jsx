import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FirebaseProvider } from "@/context/FirebaseContext";
import Footer from "@/components/Footer"
import Header from "@/components/Header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tech-4-Seniors",
  description: "Next generation technology, for the older generatiom",
};

export default function RootLayout({children}){
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
            <FirebaseProvider>
              <Header />
        {children}
        <Footer />
        </FirebaseProvider>
      </body>
    </html>
  );
}
