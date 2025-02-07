import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContex";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setUserId } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Signup");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const onLogin = async (event) => {
  //   event.preventDefault();
  //   const endpoint = "/api/user/login";
  //   const newUrl = `${url}${endpoint}`;
  
  //   try {
  //     const response = await axios.post(newUrl, data);
  //     if (response.data.success) {
  //       localStorage.setItem("token", response.data.token);
  //       localStorage.setItem("userId", response.data.userId);
  //       localStorage.setItem("role", response.data.role); // ✅ Store role
  
  //       setToken(response.data.token);
  //       setUserId(response.data.userId);
  //       setShowLogin(false);
  
  //       // ✅ Redirect Admin to Admin Panel
  //       if (response.data.role === "admin") {
  //         window.location.href = "https://food-delivery-admin-6kig.onrender.com";
  //       } else {
  //         window.location.reload();
  //       }
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("❌ Error during login:", error);
  //     toast.error("An error occurred. Please try again later.");
  //   }
  // };
  
  const onLogin = async (event) => {
    event.preventDefault();
    const endpoint = currentState === "Login" ? "/api/user/login" : "/api/user/register";
    const newUrl = `${url}${endpoint}`;
  
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("role", response.data.role); // ✅ Store role
  
        setToken(response.data.token);
        setUserId(response.data.userId);
        setShowLogin(false);
        
        // ✅ Redirect based on role
        if (response.data.role === "admin") {
          window.location.href = "https://food-delivery-admin-6kig.onrender.com";
        } else {
          window.location.href = "https://food-delivery-frontend-ed5x.onrender.com";
        }
  
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center px-4 sm:px-0">
      <form
        onSubmit={onLogin}
        className="bg-white w-full max-w-[400px] sm:max-w-[350px] md:max-w-[330px] p-6 rounded-lg shadow-lg flex flex-col gap-5 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-4 cursor-pointer"
          />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          {currentState !== "Login" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#EB6915] text-white py-2 rounded text-base font-medium transition hover:bg-orange-600"
        >
          {currentState === "Signup" ? "Create account" : "Login"}
        </button>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" required className="mt-1" />
          <p>
            By continuing, I agree to the{" "}
            <span className="font-medium cursor-pointer text-orange-600">
              terms of use & privacy policy
            </span>
            .
          </p>
        </div>

        {/* Toggle Login/Signup */}
        {currentState === "Login" ? (
          <p className="text-sm text-center">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Signup")}
              className="text-[#EB6915] font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => setCurrentState("Login")}
              className="text-[#EB6915] font-medium cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
