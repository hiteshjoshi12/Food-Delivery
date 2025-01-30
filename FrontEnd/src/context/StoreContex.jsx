/* eslint-disable react/prop-types */
import { createContext } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);
console.log(food_list);

const StoreContextProvider = (props) => {
  const ContextValue = {
    food_list,
  };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
