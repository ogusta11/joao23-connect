
import { Navigation } from "./Navigation";
import { useEffect } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // Detecta preferência do sistema
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <Navigation />
        <main className="flex-1 mb-16 md:mb-0 md:ml-64">
          <div className="max-w-2xl mx-auto p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};
