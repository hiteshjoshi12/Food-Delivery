import { useContext } from "react";
import { StoreContext } from "../../context/StoreContex";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className="flex justify-between items-start gap-12 mt-24 flex-wrap">
      <div className="w-full max-w-[min(30%,500px)]">
        <p className="text-2xl font-semibold mb-12">Delivery Information</p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato"
          />
        </div>
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato mt-3"
        />
        <input
          type="text"
          placeholder="Street"
          className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato mt-3"
        />
        <div className="flex gap-3 mt-3">
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato"
          />
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato"
          />
        </div>
        <div className="flex gap-3 mt-3">
          <input
            type="text"
            placeholder="Zip code"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato"
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato"
          />
        </div>
        <input
          type="text"
          placeholder="Phone"
          className="w-full p-2 border border-gray-300 rounded-md outline-none focus:outline-tomato mt-3"
        />
      </div>

      <div className="w-full max-w-[min(40%,500px)]">
        <div className="flex flex-col gap-5">
          <h2 className="text-lg font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-gray-600">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount() === 0?0:2}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Total</p>
              <b>{getTotalCartAmount() === 0 ?"":getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button className="bg-[#eb6915] text-white w-56 py-3 rounded-md cursor-pointer mt-6">
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
