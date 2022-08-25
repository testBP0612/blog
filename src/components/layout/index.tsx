import React from 'react';

import Header from './Header';
import Footer from '@components/layout/Footer';

interface LayoutProps {
  children: React.ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container mx-auto">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
