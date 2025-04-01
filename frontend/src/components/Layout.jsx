import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100 overflow-hidden"
      
    >
      {/* Fixed Transparent Navbar */}
      <Navbar />

      {/* Main Content - No scrolling issue */}
      <main className="flex-grow d-flex justify-content-center align-items-center">
        <Outlet />
      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default Layout;