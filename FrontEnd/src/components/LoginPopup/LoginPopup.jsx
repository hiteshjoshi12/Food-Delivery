import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex items-center justify-center">
      <form className="bg-white w-[min(27vw,330px)] p-6 rounded-lg shadow-lg flex flex-col gap-6 animate-fadeIn">
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
          {currentState !== "Login" && (
            <input type="text" placeholder="Your Name" required className="border border-gray-300 p-2 rounded outline-none" />
          )}
          <input type="email" placeholder="Your Email" required className="border border-gray-300 p-2 rounded outline-none" />
          <input type="password" placeholder="Your Password" required className="border border-gray-300 p-2 rounded outline-none" />
        </div>
        <button className="w-full bg-[#EB6915] text-white py-2 rounded text-base font-medium">
          {currentState === "Signup" ? "Create account" : "Login"}
        </button>
        <div className="flex items-start gap-2 text-sm -mt-3">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, I agree to the <span className="font-medium cursor-pointer">terms of use & privacy policy</span>.</p>
        </div>
        {currentState === "Login" ? (
          <p className="text-sm">
            Create a new account? <span onClick={() => setCurrentState("Sign Up")} className="text-[#EB6915] font-medium cursor-pointer">Click here</span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account? <span onClick={() => setCurrentState("Login")} className="text-[#EB6915] font-medium cursor-pointer">Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;