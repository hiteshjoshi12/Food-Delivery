/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});

  const addToCart = (itemid) => {
    if (!cartItems[itemid]) {
      setCartItem((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }
  };

  const removeFromCart = (itemid) => {
    setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let iteminfo = food_list.find((product) => product._id === item);
        totalAmount += iteminfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const ContextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
