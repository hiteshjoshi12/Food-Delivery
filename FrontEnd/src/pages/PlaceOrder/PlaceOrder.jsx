import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContex";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems, userId, url, token, food_list,costAfterPromo } =
    useContext(StoreContext);
  const [loading, setLoading] = useState(false);
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
    if (
      data.firstName == "" &&
      data.lastName == "" &&
      data.email == "" &&
      data.phone == "" &&
      data.city == "" &&
      data.country == ""
    ) {
      toast.error("Delivery Information");
      return;
    }

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

    //Ensure cartItems are correctly formatted with price & name
    const formattedCartItems = Object.entries(cartItems)
      .filter(([id, quantity]) => quantity > 0)
      .map(([id, quantity]) => {
        const item = food_list.find((food) => food._id === id); 
        return {
          itemId: id,
          quantity,
          price: item?.price || 0, 
          name: item?.name || "Unknown Item", 
        };
      });

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
        amount:costAfterPromo !== null ? costAfterPromo : getTotalCartAmount() + 149,
        address: data,
      };



      const orderResponse = await axios.post(
        `${url}/api/order/placeOrder`,
        requestData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || "Order creation failed!");
      }
      const paymentInitResponse = await axios.post(
        `${url}/api/order/placeOrder`,
        {
          userId,
          items: formattedCartItems,
          amount: costAfterPromo !== null ? costAfterPromo : getTotalCartAmount() + 149,
          address: data,
        },
        { headers: { Authorization: `Bearer ${token}` } } 
      );

      if (!paymentInitResponse.data.success) {
        throw new Error(paymentInitResponse.data.message);
      }

      const razorpayOrderId = paymentInitResponse.data.orderId; 
      const totalAmount = paymentInitResponse.data.amount * 100; 

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
            const verifyRes = await axios.post(`${url}/api/order/verifyOrder`, {
              orderId: razorpayOrderId,
              payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              userId, 
              items: formattedCartItems, 
              amount: getTotalCartAmount(), 
              address: data, 
            });

            if (verifyRes.data.success) {
              toast.success("Payment successful! Your order is confirmed.");
              window.location.href = "/myorders";
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
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
      toast.error(error.message || "Payment failed!");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <form className="flex flex-col lg:flex-row justify-between items-start gap-10 mt-16 px-4 md:px-10">
      {/* Delivery Information */}
      <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center lg:text-left">
          Delivery Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
          className="w-full p-2 border border-gray-300 rounded-md mt-4"
        />
      </div>

      {/* Cart Totals & Payment */}
      <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-center lg:text-left">
          Cart Totals
        </h2>

        <div className="text-gray-600">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <p>Delivery Fee</p>
            <p>{getTotalCartAmount() > 500 ? "₹0" : "₹149"}</p>
          </div>
          <hr className="my-2" />
          {costAfterPromo !== null && (
              <>
                <div className="flex justify-between text-green-600 font-bold">
                  <p>Promo Discount</p>
                  <p>-₹75</p>
                </div>
                <hr className="my-2" />
              </>
            )}
          <div className="flex justify-between text-gray-800 font-bold">
            <p>Total</p>
            <b>₹{costAfterPromo !== null ? costAfterPromo : getTotalCartAmount() + 149}</b>
          </div>
        </div>

        <button
          type="button"
          className="bg-[#eb6915] text-white w-full py-3 rounded-md cursor-pointer mt-6 hover:bg-orange-600 transition"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "PROCEED TO PAYMENT"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
