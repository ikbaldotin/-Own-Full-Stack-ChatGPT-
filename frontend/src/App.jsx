import React, { useState } from "react";
import Sidevar from "./components/Sidebar";
import Chatbox from "./components/Chatbox";
import Credits from "./pages/Credit";
import Community from "./pages/Community";
import { Routes, Route, useLocation } from "react-router-dom";
import { assets } from "../public/assets";
import "../public/prism.css";
import Loading from "./pages/Loading";
import { useAppContext } from "./context/AppContext";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
const App = () => {
  const { user, loadingUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  if (pathname === "/loading" || loadingUser) return <Loading />;
  return (
    <>
      <Toaster />
      {!isMenuOpen && (
        <img
          src={assets.menu_icon}
          className="absolute top-3 left-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert"
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      {user ? (
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
      ) : (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#242124] to-[#000000]">
          <Login />
        </div>
      )}
    </>
  );
};

export default App;
