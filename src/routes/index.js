import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Comparador from "../pages/comparador";
import Relatorios from "../pages/relatorios";

export default function Rotas() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="comparador" element={<Comparador />} />
      <Route path="relatorios" element={<Relatorios />} />
    </Routes>
  );
}
