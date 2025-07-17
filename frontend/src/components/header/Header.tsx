import { useState } from "react";
import Logo from "../../assets/logo.png";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <header className="mb-8 w-full flex justify-center">
      <div className="flex items-center justify-between w-[80%]">
        <div className="flex items-center mt-5">
          <img src={Logo} alt="Logo" className="w-20" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">TaskFlow</h1>
            <p className="text-gray-600 font-semibold">
              Advanced Todo Management
            </p>
          </div>
        </div>
        <div className="flex items-center mt-5 gap-5">
          <button
            id="themeToggle"
            className="p-2 rounded-lg bg-white shadow-md hover:shadow-lg"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >{!isDarkMode ? (
            <HiOutlineMoon size={25} className="cursor-pointer" />
          ): (
            <HiOutlineSun size={25} className="cursor-pointer text-amber-300"/>
          )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
