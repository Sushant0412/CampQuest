import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";

import Navbar from "./Pages/partials/Navbar";
import Footer from "./Pages/partials/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
