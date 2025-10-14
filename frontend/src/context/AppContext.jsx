import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../../public/assets";

const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectChat, setSelectChat] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const fetchUser = async () => {
    setUser(dummyUserData);
  };
  const fetchUserChats = async () => {
    setChats(dummyChats);
    setSelectChat(dummyChats[0]);
  };
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(() => {
    if (user) {
      fetchUserChats();
    } else {
      setChats([]);
      setSelectChat(null);
    }
  }, [user]);
  useEffect(() => {
    fetchUser();
  }, []);
  const value = {
    navigate,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectChat,
    setSelectChat,
    theme,
    setTheme,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
