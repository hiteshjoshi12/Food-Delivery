/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});

  const addToCart = (itemid) => {
    if (!cartItems[itemid]) {
      setCartItem((prev) => ({ ...prev, [itemid]: 1 }));
    }
    else{
      setCartItem((prev)=>({...prev,[itemid]:prev[itemid]+1}))
    }
  };

  const removeFromCart = (itemid) => {
    setCartItem((prev)=>({...prev,[itemid]:prev[itemid]-1}))
  };

  useEffect(()=>{
console.log(cartItems)
  },[cartItems])

  const ContextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart
  };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
