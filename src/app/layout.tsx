import "~/styles/globals.css";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";
import Navbar from "~/components/Navbar";
import Banner from "~/components/Banner";
import Provider from "./_trpc/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Category Picker Application",
  description: "Get Deals of Category of Application Selected",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`font-sans ${inter.variable} flex min-h-screen flex-col items-center justify-start bg-white text-black`}
      >
        <Navbar />
        <Banner />
        <Provider>{children}</Provider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
