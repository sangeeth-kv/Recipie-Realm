
import Headers from "../componets/Headers/Header";
import Footer from "../componets/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {

    
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Fixed Header */}
      <Headers />

      {/* Main content */}
      <main className="flex-1 pt-16 px-6">
        <Outlet /> 
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}