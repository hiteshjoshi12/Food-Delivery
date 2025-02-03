import { useContext } from "react";
import { StoreContext } from "../../context/StoreContex";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className="mt-24">
      <div className="w-full">
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-sm sm:text-xs">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr className="h-px bg-gray-300 border-none" />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center my-2 text-black">
                <img src={item.image} alt="" className="w-12" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>{item.price * cartItems[item._id]}</p>
                <p className="cursor-pointer" onClick={() => removeFromCart(item._id)}>X</p>
              </div>
            );
          }
        })}
      </div>
      <div className="flex justify-between gap-5 mt-20 flex-wrap ">
        <div className="flex flex-col gap-5 flex-1">
          <h2 className="text-lg font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-gray-600">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0 ?0:2}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Total</p>
              <b>{getTotalCartAmount() === 0?"": getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')} className="bg-[#eb6915] text-white w-56 py-3 rounded-md cursor-pointer">
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="flex-1">
          <p className="text-gray-600">If you have a promo code, enter it here</p>
          <div className="mt-2 flex justify-between items-center bg-gray-200 rounded-md p-2">
            <input
              type="text"
              placeholder="Promo Code"
              className="bg-transparent border-none outline-none pl-2 flex-grow"
            />
            <button className="w-36 bg-black text-white py-3 rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
