/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItem] = useState({});
  const url= "http://localhost:4000"
  const [token, setToken] = useState("");
  const [food_list,setFoodList] = useState([]);

  const addToCart = async (itemid) => {
    if (!cartItems[itemid]) {
      setCartItem((prev) => ({ ...prev, [itemid]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
    }
  
    if (token) {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.post(
          url + "/api/cart/add",
          { userId, itemId: itemid },  
          { headers: { Authorization: `Bearer ${token}` } } 
        );
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
      }
    }
  };
  

  const removeFromCart = async (itemid) => {
    setCartItem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
    if(token){
      axios.post(
          url + "/api/cart/remove",
          { itemId: itemid },  
          { headers: { Authorization: `Bearer ${token}` } } 
        );
    }
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

  const fetchFoodList = async ()=>{
    const response = await axios.get(url+"/api/food/list")
    setFoodList(response.data.data)
  }

  const loadCartData = async (token) =>{
    const response = await axios.post(url+"/api/cart/get",{},{ headers: { Authorization: `Bearer ${token}` } })
    setCartItem(response.data.cartData);
  }

  useEffect (()=>{
    
    async function laodData(){
      await fetchFoodList()
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"))
      }
    }
    laodData();
  },[])

  const ContextValue = {
    food_list,
    cartItems,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };
  return (
    <StoreContext.Provider value={ContextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
