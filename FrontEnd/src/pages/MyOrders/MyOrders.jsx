import { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContex';
import axios from 'axios';
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            setData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-12">
            <h2 className="text-2xl font-semibold">My Orders</h2>
            <div className="flex flex-col gap-5 mt-8">
                {data.map((order, index) => (
                    <div 
                        key={index} 
                        className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-8 text-sm p-3 border border-tomato text-gray-700 md:grid-cols-[1fr_2fr_1fr] md:gap-1 md:text-xs"
                    >
                        <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12" />
                        <p>
                            {order.items.map((item, i) => (
                                i === order.items.length - 1
                                    ? `${item.name} x ${item.quantity}`
                                    : `${item.name} x ${item.quantity}, `
                            ))}
                        </p>
                        <p>₹{order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p className="flex items-center">
                            <span className="text-tomato">&#x25cf;</span> 
                            <b className="font-medium text-gray-700 ml-1">{order.status}</b>
                        </p>
                        <button 
                            onClick={fetchOrders} 
                            className="border-none py-3 rounded bg-[#ffe1e1] cursor-pointer text-gray-700 md:text-[10px]"
                        >
                            Track Order
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
