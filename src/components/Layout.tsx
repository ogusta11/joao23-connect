
import { Navigation } from "./Navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto">
        <Navigation />
        <main className="flex-1 mb-16 md:mb-0 md:ml-64">
          <div className="max-w-2xl mx-auto p-4">{children}</div>
        </main>
      </div>
    </div>
  );
};
