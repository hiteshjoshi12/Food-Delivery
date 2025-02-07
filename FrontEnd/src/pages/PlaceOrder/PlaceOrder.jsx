import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContex";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, userId, url, token,food_list } =useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  console.log("🔹 User ID Before Order:", userId);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    console.log("🔹 User ID Before Order:", userId);

    if (!userId) {
      toast.error("User not logged in. Please login to place an order.");
      return;
    }

    if (getTotalCartAmount() === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay. Check your internet connection.");
      setLoading(false);
      return;
    }

    // ✅ Ensure cartItems are correctly formatted with price & name
    const formattedCartItems = Object.entries(cartItems)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const item = food_list.find((food) => food._id === id); // Ensure item data is retrieved
        return {
          itemId: id,
          quantity,
          price: item?.price || 0, // Ensure price is included
          name: item?.name || "Unknown Item", // Include item name
        };
      });

    console.log("🔹 Formatted Cart Items:", formattedCartItems);

    if (formattedCartItems.length === 0) {
      toast.error("Your cart is empty!");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Place order
      const requestData = {
        userId,
        items: formattedCartItems,
        amount: getTotalCartAmount(),
        address: data,
      };

      console.log("🔹 Sending Order Request:", requestData);

      const orderResponse = await axios.post(
        `${url}/api/order/placeOrder`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Order Response:", orderResponse.data);

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || "Order creation failed!");
      }

      const orderId = orderResponse.data.orderId;

      // Step 2: Create Razorpay Order
      // const paymentInitResponse = await axios.post(
      //   `${url}/api/order/placeOrder`,
      //   { orderId }
      // );

      const paymentInitResponse = await axios.post(
        `${url}/api/order/placeOrder`,
        { userId, items: formattedCartItems, amount: getTotalCartAmount(), address: data },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Ensure token is passed
      );
      

      if (!paymentInitResponse.data.success) {
        throw new Error(paymentInitResponse.data.message);
      }

      const razorpayOrderId = paymentInitResponse.data.orderId; // ✅ Ensure correct order ID
      const totalAmount = paymentInitResponse.data.amount * 100; // ✅ Convert to paise

      // Step 3: Open Razorpay Checkout
      const options = {
        key: paymentInitResponse.data.key_id,
        amount: totalAmount,
        currency: "INR",
        name: "Food Delivery",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (paymentResponse) {
            try {
                console.log("🔹 Sending Verify Order Request:", {
                    orderId: razorpayOrderId,
                    payment_id: paymentResponse.razorpay_payment_id,
                    razorpay_signature: paymentResponse.razorpay_signature,
                    userId, // ✅ Include userId
                    items: formattedCartItems, // ✅ Include items
                    amount: getTotalCartAmount(), // ✅ Include amount
                    address: data // ✅ Include address
                });
    
                const verifyRes = await axios.post(`${url}/api/order/verifyOrder`, {
                    orderId: razorpayOrderId,
                    payment_id: paymentResponse.razorpay_payment_id,
                    razorpay_signature: paymentResponse.razorpay_signature,
                    userId, // ✅ Ensure this is sent
                    items: formattedCartItems, // ✅ Include items array
                    amount: getTotalCartAmount(), // ✅ Include total amount
                    address: data // ✅ Include address details
                });
    
                if (verifyRes.data.success) {
                    toast.success("Payment successful! Your order is confirmed.");
                    window.location.href = "/myorders";
                } else {
                    toast.error("Payment verification failed!");
                }
            } catch (error) {
                console.error("❌ Payment Verification Error:", error);
                toast.error("Payment verification failed!");
            }
        },
        prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
        },
        theme: { color: "#eb6915" },
    };
    

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("❌ Payment Error:", error.response?.data || error.message);
      toast.error(error.message || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex justify-between items-start gap-12 mt-24 flex-wrap">
      <div className="w-full max-w-[min(30%,500px)]">
        <p className="text-2xl font-semibold mb-12">Delivery Information</p>
        <div className="flex gap-3">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
          className="w-full p-2 border border-gray-300 rounded-md mt-3"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="w-full p-2 border border-gray-300 rounded-md mt-3"
        />
        <div className="flex gap-3 mt-3">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex gap-3 mt-3">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <input
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
          className="w-full p-2 border border-gray-300 rounded-md mt-3"
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
              <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-gray-800 font-bold">
              <p>Total</p>
              <b>
                {getTotalCartAmount() === 0 ? "" : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button
            type="button"
            className="bg-[#eb6915] text-white w-56 py-3 rounded-md cursor-pointer mt-6"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
