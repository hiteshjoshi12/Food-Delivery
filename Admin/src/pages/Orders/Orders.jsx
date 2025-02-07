import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/admin_assets/assets";

const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      toast.error("Server error while fetching orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("❌ Status Update Error:", error);
      toast.error("Error updating order status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-8 border border-red-500 p-5 text-sm text-gray-600 rounded-md"
          >
            <img src={assets.parcel_icon} alt="Parcel" className="w-12 h-12" />
            
            <div>
              <p className="font-semibold">
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p className="mt-3 mb-1 font-semibold">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div className="text-gray-500 mb-2">
                <p>{order.address.street},</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
              </div>
              <p className="text-gray-700">{order.address.phone}</p>
            </div>

            <p className="text-center">Items: {order.items.length}</p>
            <p className="font-semibold text-center">₹{order.amount}</p>

            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="bg-red-100 border border-red-500 px-4 py-2 rounded-md outline-none"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
