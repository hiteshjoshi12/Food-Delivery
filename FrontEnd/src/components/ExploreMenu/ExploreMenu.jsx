/* eslint-disable react/prop-types */
import { menu_list } from "../../assets/frontend_assets/assets";
const ExploreMenu = ({ category, setCategory }) => {
  console.log("ExploreMenu category:", category);
  return (
    <div className="flex flex-col gap-5 mt-8" id="explore-menu">
      <h1 className="text-[#262626] font-medium text-3xl">Explore our menu</h1>
      <p className="max-w-[100%] md:max-w-[60%] text-[#808080]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craveings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex justify-between items-center gap-8 m-[30px 0px] overflow-x-scroll">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "ALL" : item.menu_name
                )
              }
              key={index}
            >
              <img
                className={
                  category === item.menu_name
                    ? "border-4 border-amber-600 w-[8.5vw] min-w-[140px] rounded-full scale-105 mt-2 ml-2 transition duration-500"
                    : "w-[8.5vw] min-w-[140px] cursor-pointer rounded-full mt-2 ml-2"
                }
                src={item.menu_image}
                alt=""
              />
              <p className="mt-2.5 text-[#747474] text-[max(1.4vw,16px) cursor-pointer] text-center">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="m-[10px 0px] h-0.5 bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;
