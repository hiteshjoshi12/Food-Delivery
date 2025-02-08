import { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContex";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, userId } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.data);
    } catch (error) {}

    useEffect(() => {
      if (token) {
        fetchOrders();
      }
    }, [token]);

    return (
      <div className="my-12 px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-semibold">My Orders</h2>

        <div className="flex flex-col gap-5 mt-6">
          {data.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-4 text-sm p-3 border border-tomato text-gray-700 rounded-md md:grid-cols-[1fr_2fr_1fr] md:gap-2 md:text-xs"
            >
              {/* Image */}
              <img
                src={assets.parcel_icon}
                alt="Parcel Icon"
                className="w-10 md:w-12 mx-auto sm:mx-0"
              />

              {/* Items Ordered */}
              <p className="text-center sm:text-left">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>

              {/* Order Amount */}
              <p className="text-center sm:text-left font-medium">
                ₹{order.amount}.00
              </p>

              {/* Number of Items */}
              <p className="text-center sm:text-left">
                Items: {order.items.length}
              </p>

              {/* Order Status */}
              <p className="flex items-center justify-center sm:justify-start">
                <span className="text-tomato">&#x25cf;</span>
                <b className="font-medium text-gray-700 ml-1">{order.status}</b>
              </p>

              {/* Track Order Button */}
              <button
                onClick={fetchOrders}
                className="py-2 w-full sm:w-auto bg-[#ffe1e1] text-gray-700 rounded-md text-xs md:text-sm hover:bg-[#ffc1c1] transition"
              >
                Track Order
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
};

export default MyOrders;
