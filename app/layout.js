// app/layout.js

import './globals.css';
import { Inter } from 'next/font/google';
import NavigationBar from './components/NavigationBar';
import ChatBox from './components/ChatBox';
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Plataforma de Pádel',
  description: 'Agenda y únete a partidos de pádel.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          <NavigationBar />
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
          <ChatBox />
        </SessionProvider>
      </body>
    </html>
  );
}
