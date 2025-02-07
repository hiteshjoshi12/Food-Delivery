import { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp, FaBars, FaTimes } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContex";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showScroll, setShowScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setIsProfileOpen(false);
  };

  return (
    <nav className="py-4 px-5 md:px-10 flex justify-between items-center bg-white shadow-md fixed w-full top-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img className="w-[120px] md:w-[150px]" src={assets.logo} alt="Logo" />
      </Link>

      {/* Navigation Links - Always Visible on Desktop */}
      <ul className={`hidden md:flex gap-8 text-[18px] text-[#49557e]`}>
        <Link to="/" onClick={() => setMenu("Home")} className={`pb-1 border-b-2 ${menu === "Home" ? "border-[#49557e]" : "border-transparent"}`}>
          Home
        </Link>
        <a href="#explore-menu" onClick={() => setMenu("Menu")} className={`pb-1 border-b-2 ${menu === "Menu" ? "border-[#49557e]" : "border-transparent"}`}>
          Menu
        </a>
        <a href="#app-download" onClick={() => setMenu("Mobile-app")} className={`pb-1 border-b-2 ${menu === "Mobile-app" ? "border-[#49557e]" : "border-transparent"}`}>
          Mobile App
        </a>
        <a href="#footer" onClick={() => setMenu("Contact-us")} className={`pb-1 border-b-2 ${menu === "Contact-us" ? "border-[#49557e]" : "border-transparent"}`}>
          Contact Us
        </a>
      </ul>

      {/* Icons & Profile */}
      <div className="flex items-center gap-5">
        {/* Cart Icon */}
        <div className="relative">
          <Link to="/cart">
            <img className="w-6 md:w-auto" src={assets.basket_icon} alt="Basket" />
          </Link>
          {getTotalCartAmount() > 0 && (
            <div className="absolute w-2.5 h-2.5 bg-amber-600 rounded-full top-[-5px] right-[-5px]"></div>
          )}
        </div>

        {/* Profile Icon - Works on Mobile & Desktop */}
        {token ? (
          <div className="relative">
            <img
              className="w-6 md:w-auto cursor-pointer"
              src={assets.profile_icon}
              alt="Profile"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {/* Dropdown Menu */}
            {isProfileOpen && (
              <ul className="absolute right-0 mt-2 bg-[#fff2ef] p-3 w-36 rounded border shadow-md list-none">
                <li onClick={() => { navigate('/myorders'); setIsProfileOpen(false); }} className="flex items-center gap-2 cursor-pointer hover:text-tomato">
                  <img src={assets.bag_icon} alt="Orders" className="w-5" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={logout} className="flex items-center gap-2 cursor-pointer hover:text-tomato">
                  <img src={assets.logout_icon} alt="Logout" className="w-5" />
                  <p>Logout</p>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)} className=" md:block bg-transparent text-[16px] text-[#49557e] border border-tomato py-2 px-6 rounded-3xl transition hover:bg-[#fff4f2]">
            Sign In
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <ul className={`absolute md:hidden top-16 left-0 w-full bg-white flex flex-col gap-5 text-[18px] text-[#49557e] ${isMenuOpen ? "flex" : "hidden"} px-5 py-5 shadow-md`}>
        <Link to="/" onClick={() => { setMenu("Home"); setIsMenuOpen(false); }} className={`pb-1 border-b-2 ${menu === "Home" ? "border-[#49557e]" : "border-transparent"}`}>
          Home
        </Link>
        <a href="#explore-menu" onClick={() => { setMenu("Menu"); setIsMenuOpen(false); }} className={`pb-1 border-b-2 ${menu === "Menu" ? "border-[#49557e]" : "border-transparent"}`}>
          Menu
        </a>
        <a href="#app-download" onClick={() => { setMenu("Mobile-app"); setIsMenuOpen(false); }} className={`pb-1 border-b-2 ${menu === "Mobile-app" ? "border-[#49557e]" : "border-transparent"}`}>
          Mobile App
        </a>
        <a href="#footer" onClick={() => { setMenu("Contact-us"); setIsMenuOpen(false); }} className={`pb-1 border-b-2 ${menu === "Contact-us" ? "border-[#49557e]" : "border-transparent"}`}>
          Contact Us
        </a>
      </ul>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-5 right-5 md:bottom-10 md:right-10 bg-[#49557e] text-white p-3 rounded-full shadow-lg hover:bg-[#323232] transition">
          <FaArrowUp size={20} />
        </button>
      )}
    </nav>
  );
};

export default Navbar;
