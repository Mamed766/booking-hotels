import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ConfigPage from "./pages/ConfigPage";
import PlanPage from "./pages/PlanPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConfigPage />} />
        <Route path="/plan" element={<PlanPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
