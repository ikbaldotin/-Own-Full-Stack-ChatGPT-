import React, { useState } from "react";
import Sidevar from "./components/Sidebar";
import Chatbox from "./components/Chatbox";
import Credits from "./pages/Credit";
import Community from "./pages/Community";
import { Routes, Route, useLocation } from "react-router-dom";
import { assets } from "../public/assets";
import "../public/prism.css";
import Loading from "./pages/Loading";
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  if (pathname === "/loading") return <Loading />;
  return (
    <>
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      <div className="dark:bg-gradient-to-b from-[#242124] to-[#000000] data:text-white">
        <div className="flex h-screen w-screen">
          <Sidevar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <Routes>
            <Route path="/" element={<Chatbox />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
