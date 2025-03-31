import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/" element={<Layout />}>
          <Route path="/campgrounds" element={<Home />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
