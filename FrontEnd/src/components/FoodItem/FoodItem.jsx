/* eslint-disable no-unused-vars */

import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContex";

/* eslint-disable react/prop-types */
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext);
  return (
    <div className="m-auto w-full rounded-[15px] shadow-2xl transition-[0.3s] [animation:fadeIn_1s_ease-in-out]">
      <div className="relative">
        <img
          className="w-full rounded-tl-2xl rounded-tr-2xl"
          src={url+"/images/"+image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="w-9 absolute bottom-4 right-4 cursor-pointer rounded-[50%]"
            src={assets.add_icon_white}
            alt=""
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center gap-2.5 p-1.5 rounded-[50px] bg-white">
            <img
              className="w-7"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              className="w-7"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-[20px] font-medium">{name}</p>
          <img className="w-[70px]" src={assets.rating_starts} alt="" />
        </div>
        <p className="text-[#676767] text-[12px]">{description}</p>
        <p className="text-amber-600 text-[22px] font-medium my-2.5">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
