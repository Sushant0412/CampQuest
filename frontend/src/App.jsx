import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./Pages/partials/Navbar";
import Footer from "./Pages/partials/Footer";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import AllCampgrounds from "./Pages/campground/index";
import Home from "./Pages/home";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/campgrounds" element={<AllCampgrounds />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
