import { Home } from "@/pages/home";
import { Map } from "@/pages/map";
import { NotFound } from "@/pages/notFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import "@/App.scss";

export const App = () => {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:countryCode/:zipCode/map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={5000} closeOnClick pauseOnHover pauseOnFocusLoss />
    </main>
  );
};
