import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Logo from './assets/logo.png'
import { MdLanguage } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Codin",
  description: "The ultimate QR code generator to connect your physical and digital worlds seamlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='./assets/logo.png'/>
      </head>

      <body className={inter.className}>
        <header className="flex border-b justify-between items-center px-6 sm:px-32 pb-4 pt-4">
          <Image src={Logo} alt="Codin logo" width={100} />

          <div className="border-2 rounded-lg px-2 flex justify-between items-center text-slate-700">
            <MdLanguage />

            <select className="px-1 outline-none">
              <option>English</option>
              <option>Português</option>
              <option>Español</option>
            </select>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
