import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/pages/Home";
import About from "./Components/pages/About";
import Contact from "./Components/pages/Contact";
import Faq from "./Components/pages/Faq";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Router>
  );
}
export default App;
