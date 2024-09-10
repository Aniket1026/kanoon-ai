import { ReactNode } from 'react';
import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Kanoon AI</title>
      </head>
      <body className={`flex flex-col justify-center items-center h-screen ${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
