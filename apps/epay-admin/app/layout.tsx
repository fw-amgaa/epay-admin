import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { RefineContext } from './_refine_context';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'E-pay admin',
    description: '',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <RefineContext>{children}</RefineContext>
            </body>
        </html>
    );
}
