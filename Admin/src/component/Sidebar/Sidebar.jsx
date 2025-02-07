import { NavLink } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";
import { useState } from "react";

const Sidebar = () => {
  const [active, setActve] = useState("add");
  return (
    <div className="min-h-[100vh] w-[18%] border-[1.5px] border-solid border-[#a9a9a9] border-t-0 text-[max(1vw,10px)] ">
      <div className="pt-14 pl-[20%] flex flex-col gap-5">
        <NavLink
          onClick={() => setActve("add")}
          to="/add"
          className={
            active === "add"
              ? "border-[#FDB8A9] bg-[#fff0ed] flex items-center gap-3 border border-solid border-r-0 py-2 px-2.5 cursor-pointer"
              : "flex items-center gap-3 border border-solid border-[#a9a9a9] border-r-0 py-2 px-2.5 cursor-pointer"
          }
        >
          <img src={assets.add_icon} alt="" />
          <p className="md:block hidden">Add Items</p>
        </NavLink>
        <NavLink
          to="/list"
          onClick={() => setActve("list")}
          className={
            active === "list"
              ? "border-[#FDB8A9] bg-[#fff0ed] flex items-center gap-3 border border-solid border-r-0 py-2 px-2.5 cursor-pointer"
              : "flex items-center gap-3 border border-solid border-[#a9a9a9] border-r-0 py-2 px-2.5 cursor-pointer"
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className="md:block hidden">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          onClick={() => setActve("order")}
          className={
            active === "order"
              ? "border-[#FDB8A9] bg-[#fff0ed] flex items-center gap-3 border border-solid border-r-0 py-2 px-2.5 cursor-pointer"
              : "flex items-center gap-3 border border-solid border-[#a9a9a9] border-r-0 py-2 px-2.5 cursor-pointer"
          }
        >
          <img src={assets.order_icon} alt="" />
          <p className="md:block hidden">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
