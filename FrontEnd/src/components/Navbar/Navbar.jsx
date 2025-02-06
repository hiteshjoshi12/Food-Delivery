import { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContex";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showScroll, setShowScroll] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="py-5 flex justify-between items-center relative">
      {/* Navbar */}
      <Link to="/">
        <img className="w-[150px]" src={assets.logo} alt="Logo" />
      </Link>
      <ul className="flex gap-5 text-[#49557e] text-[18px]">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={
            menu === "Home"
              ? "pb-0.5 border-b-[2px] border-solid border-[#49557e]"
              : "cursor-pointer"
          }
        >
          Home
        </Link>
        <a
          href="#expore-menu"
          onClick={() => setMenu("Menu")}
          className={
            menu === "Menu"
              ? "pb-0.5 border-b-[2px] border-solid border-[#49557e]"
              : "cursor-pointer"
          }
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-app")}
          className={
            menu === "Mobile-app"
              ? "pb-0.5 border-b-[2px] border-solid border-[#49557e]"
              : "cursor-pointer"
          }
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact-us")}
          className={
            menu === "Contact-us"
              ? "pb-0.5 border-b-[2px] border-solid border-[#49557e]"
              : "cursor-pointer"
          }
        >
          Contact Us
        </a>
      </ul>
      <div className="flex items-center gap-10">
        <img src={assets.search_icon} alt="Search" />
        <div className="relative">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket" />
          </Link>
          <div
            className={
              getTotalCartAmount() === 0
                ? ""
                : "absolute w-2.5 h-2.5 bg-amber-600 rounded-xl top-[-8px] right-[-8px]"
            }
          ></div>
        </div>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-transparent text-[16px] text-[#49557e] border border-tomato py-2.5 px-[30px] cursor-pointer rounded-3xl transition duration-300 hover:bg-[#fff4f2]"
          >
            Sign In
          </button>
        ) : (
          <div className="relative cursor-pointer group">
            <img src={assets.profile_icon} alt="" />
            <ul className="absolute right-0 z-10 hidden flex-col gap-2 bg-[#fff2ef] p-3 w-36 rounded border outline outline-white list-none group-hover:flex">
              <li className="flex items-center gap-2 cursor-pointer hover:text-tomato">
                <img src={assets.bag_icon} alt="" className="w-5" />
                <p className="hover:text-amber-600">Orders</p>
              </li>
              <hr />
              <li className="flex items-center gap-2 cursor-pointer hover:text-tomato">
                <img src={assets.logout_icon} alt="" className="w-5" />
                <p onClick={logout} className="hover:text-amber-600">Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 md:bottom-10 md:right-10 bg-[#49557e] text-white p-3 rounded-full shadow-lg hover:bg-[#323232] transition duration-300"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
