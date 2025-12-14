// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GitHub Wrapped 2025',
  description: 'Your GitHub year in a Spotify-style wrapped experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
