import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TFG Informática',
  description: 'Proyecto para la gestión de muestras de rocas',
};

const RootLayout = ({ children, } : Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;