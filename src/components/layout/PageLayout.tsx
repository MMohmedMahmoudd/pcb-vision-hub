import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background bg-circuit">
      <Sidebar />
      <main className="ml-64">
        <Header title={title} subtitle={subtitle} />
        <div className="p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
