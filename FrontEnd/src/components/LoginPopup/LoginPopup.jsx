import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContex";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
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

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl =url;
    if(currentState === "Login"){
      newUrl+="/api/user/login"
    }else{
      newUrl +="/api/user/register"
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
      <form onSubmit={onLogin} className="bg-white w-[min(27vw,330px)] p-6 rounded-lg shadow-lg flex flex-col gap-6 animate-fadeIn">
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg font-semibold">{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5">
        {currentState !== 'Login' && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" className="w-full bg-[#EB6915] text-white py-2 rounded text-base font-medium">
          {currentState === "Signup" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 text-sm -mt-3">
          <input type="checkbox" required className="mt-1" />
          <p>
            By continuing, I agree to the{" "}
            <span className="font-medium cursor-pointer">
              terms of use & privacy policy
            </span>
            .
          </p>
        </div>
        {currentState === "Login" ? (
          <p className="text-sm">
            Create a new account?{" "}
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-[#EB6915] font-medium cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
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
