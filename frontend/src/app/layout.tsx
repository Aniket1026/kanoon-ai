import { ReactNode } from 'react';
import './globals.css'
import Header from '../components/Header';
import { Roboto } from 'next/font/google';


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="flex flex-col justify-center items-center h-screen">
        <Header />
        <main className={`w-full flex flex-grow ${roboto.className}`}>{children}</main>
      </body>
    </html>
  );
}


