import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/home";
import { Map } from "./pages/map";

import "react-toastify/dist/ReactToastify.min.css";
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
      <ToastContainer autoClose={5000} closeOnClick pauseOnHover pauseOnFocusLoss />
    </main>
  );
};
