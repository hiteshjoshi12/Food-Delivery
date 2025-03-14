import { useContext, useRef, useState } from "react";
import { StoreContext } from "../../context/StoreContex";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url,setCostAfterPromo ,costAfterPromo } = useContext(StoreContext);
  const navigate = useNavigate();
  const promocode = useRef();


  const handleApplyPromo = () => {
    const promoValue = promocode.current.value.trim();    
    if (promoValue === "GOODDAY75") {
      const discountedAmount = Math.max(getTotalCartAmount()+149 - 75, 0); // Ensure total is not negative
      setCostAfterPromo(discountedAmount);
    } else {
      setCostAfterPromo(null); // Reset if invalid
    }
  };

  return (
    <div className="mt-24 px-4 md:px-8">
      <div className="w-full">
        {/* Table Headers */}
        <div className="grid grid-cols-6 items-center text-gray-500 text-xs md:text-sm border-b pb-2">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Qty</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        {/* Cart Items */}
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div
                key={index}
                className="grid grid-cols-6 items-center text-black gap-2 my-3 p-2 border-b border-gray-300 text-xs md:text-sm"
              >
                {/* Image */}
                <img src={item.image} alt={item.name} className="w-12 md:w-16 rounded-md" />

                {/* Title */}
                <p className="truncate">{item.name}</p>

                {/* Price */}
                <p className="text-gray-700">₹{item.price}</p>

                {/* Quantity */}
                <p>{cartItems[item._id]}</p>

                {/* Total Price */}
                <p className="font-semibold">₹{item.price * cartItems[item._id]}</p>

                {/* Remove Button */}
                <p className="cursor-pointer text-red-500 font-bold text-lg md:text-xl" onClick={() => removeFromCart(item._id)}>
                  ✕
                </p>
              </div>
            );
          }
        })}
      </div>

      {/* Cart Totals & Promo Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 mt-10">
        
        {/* Cart Totals */}
        <div className="flex flex-col gap-5 flex-1 bg-gray-100 p-5 rounded-lg">
          <h2 className="text-lg font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() > 500 ? "₹0" : "₹149"}</p>
            </div>
            <hr className="my-2" />

            {/* Promo Discount Row (Only Show if Applied) */}
            {costAfterPromo !== null && (
              <>
                <div className="flex justify-between text-green-600 font-bold">
                  <p>Promo Discount</p>
                  <p>-₹75</p>
                </div>
                <hr className="my-2" />
              </>
            )}

            {/* Final Total Calculation */}
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Total</p>
              <b>₹{costAfterPromo !== null ? costAfterPromo : getTotalCartAmount() + 149}</b>
            </div>
          </div>
          <button 
            onClick={() => navigate('/order')} 
            className="bg-[#eb6915] text-white w-full md:w-56 py-3 rounded-md cursor-pointer hover:bg-orange-600 transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo Code Section */}
        <div className="flex-1 bg-gray-100 p-5 rounded-lg">
          <p className="text-gray-600">If you have a promo code, enter it here:</p>
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <input ref={promocode}
              type="text"
              placeholder="Promo Code"
              className="bg-white border border-gray-300 rounded-md px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button onClick={handleApplyPromo} className="w-full sm:w-36 bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
              Submit
            </button>
          </div>
          <p className="text-gray-600 mt-3">APPLY GOODDAY75 for 75 OFF.</p>
        </div>

      </div>
    </div>
  );
};

export default Cart;
