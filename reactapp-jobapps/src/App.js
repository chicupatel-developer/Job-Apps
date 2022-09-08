import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/pages/Home";
import Apply_To_Job from "./Components/pages/Apply_To_Job";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/apply-job" element={<Apply_To_Job />} />
      </Routes>
    </Router>
  );
}
export default App;
