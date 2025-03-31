import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <main className="container mt-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
