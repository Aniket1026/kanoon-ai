import { ReactNode } from 'react';
import Header from '../../components/Header';
import '../globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export default function ChatLayout({ children }: { children: ReactNode }) {
    return (
        <div className={`flex flex-col justify-center items-center h-screen w-full ${roboto.className}`}>
            <main className="w-full flex flex-grow">
                {children}
            </main>
        </div>
    );
}
