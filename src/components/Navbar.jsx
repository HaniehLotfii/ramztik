import logoLight from "../assets/LogoLight.png";
import logoDark from "../assets/LogoDark.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaBookmark } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();

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
            className="hidden dark:block w-[130px] h-[50px] object-cover"
          />
        </Link>

        <div className="flex">
          <ThemeToggle />
          {/* Bookmark Button */}
          {location.pathname !== "/bookmarks" && (
            <Link to="/bookmarks">
              <button className="flex items-center gap-2 p-2 px-3 text-sm text-cyan-700 bg-gray-200 rounded-xl dark:text-cyan-700 transition-colors">
                <FaBookmark className="text-lg" />
                <span className="text-xs">ارزهای من</span>{" "}
                {/* فقط متن کوچیک میشه */}
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
