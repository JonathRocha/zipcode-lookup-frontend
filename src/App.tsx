import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Map } from "./pages/map";

import "./App.scss";

export const App = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:zipCode/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
};
