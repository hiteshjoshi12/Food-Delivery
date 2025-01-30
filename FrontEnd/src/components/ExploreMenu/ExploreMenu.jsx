import { menu_list } from "../../assets/frontend_assets/assets";
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="flex flex-col gap-5 mt-8">
      <h1 className="text-[#262626] font-medium text-3xl">Explore our menu</h1>
      <p className="max-w-[60%] text-[#808080]">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your craveings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex justify-between items-center gap-8 m-[30px 0px] overflow-x-scroll">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"ALL":item.menu_name)} key={index}>
              <img className={category===item.menu_name?"border-4 border-solid border-amber-600 rounded-[50%] p-0.5":"w-[7.5vw] min-w-[80px] cursor-pointer"}             src={item.menu_image} alt="" />
              <p className="mt-2.5 text-[#747474] text-[max(1.4vw,16px) cursor-pointer] text-center">{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr className="m-[10px 0px] h-0.5 bg-[#e2e2e2] border-none" />
    </div>
  );
};

export default ExploreMenu;
