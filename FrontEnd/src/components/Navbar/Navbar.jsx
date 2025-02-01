import { useState } from "react"
import { assets } from "../../assets/frontend_assets/assets"
import { Link } from "react-router-dom"

const Navbar = () => {

    const[menu,setMenu] = useState("Home");


  return (
    <div className="py-5 flex justify-between items-center">
        <img className="w-[150px]" src={assets.logo} alt="" />
        <ul className="flex gap-5 text-[#49557e] text-[18px]" >
            <Link to="/" onClick={()=>setMenu("Home")} className={menu==="Home"?"pb-0.5 border-b-[2px] border-solid border-[#49557e]":" cursor-pointer"}>Home</Link>
            <a href="#expore-menu" onClick={()=>setMenu("Menu")} className={menu==="Menu"?"pb-0.5 border-b-[2px] border-solid border-[#49557e]":" cursor-pointer"}>Menu</a>
            <a href="#app-download" onClick={()=>setMenu("Mobile-app")} className={menu==="Mobile-app"?"pb-0.5 border-b-[2px] border-solid border-[#49557e]":" cursor-pointer"}>Mobile App</a>
            <a href="#footer" onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"pb-0.5 border-b-[2px] border-solid border-[#49557e]":" cursor-pointer"}>Contact Us</a>
        </ul>
        <div className="flex items-center gap-10">
            <img src={assets.search_icon} alt="" />
            <div className="relative">
                <img src={assets.basket_icon} alt="" />
                <div className=" absolute min-w-2.5 min-h-2.5 bg-amber-600 rounded-xl top-[-8px] right-[-8px]"></div>
            </div>
            <button className="bg-transparent text-[16px] text-[#49557e] border-1 border-tomato py-2.5 px-[30px] cursor-pointer rounded-3xl transition duration-300 hover:bg-[#fff4f2]">Sign In</button>
        </div>
    </div>
  )
}

export default Navbar