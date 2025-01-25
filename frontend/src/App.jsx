import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import Navbar from "./Pages/partials/Navbar";
import Footer from "./Pages/partials/Footer";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
