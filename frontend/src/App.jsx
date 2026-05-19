import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import MonumentAnalysis from "./pages/MonumentAnalysis";
import Validation from "./pages/Validation";
import Methodology from "./pages/Methodology";
import Limitations from "./pages/Limitations";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="analysis" element={<MonumentAnalysis />} />
          <Route path="validation" element={<Validation />} />
          <Route path="methodology" element={<Methodology />} />
          <Route path="limitations" element={<Limitations />} />
        </Route>
      </Routes>
    </Router>
  );
}