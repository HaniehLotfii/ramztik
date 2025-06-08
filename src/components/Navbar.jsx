import logoLight from "../assets/LogoLight.png";
import logoDark from "../assets/LogoDark.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="w-full px-4 sm:px-8 lg:px-12 py-1 bg-white dark:dark:bg-[#1C1C34]
 shadow fixed top-0 left-0 z-50 animate-fade-in"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src={logoLight}
            alt="Ramztik Logo Light"
            className="block dark:hidden w-[130px] h-[50px] object-cover"
          />

          <img
            src={logoDark}
            alt="Ramztik Logo Dark"
            className="hidden dark:block w-[170px] h-[50px] object-cover"
          />
        </Link>

        {/* Bookmark Button */}
        <button
          className="flex items-center gap-2 mx-3 px-3 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-300 border border-cyan-600 dark:border-cyan-300 rounded hover:bg-cyan-50 dark:hover:bg-gray-800 transition-colors"
          onClick={() => {
            alert("صفحه بوکمارک در حال توسعه است");
          }}
        >
          🔖 بوکمارک‌ها
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
