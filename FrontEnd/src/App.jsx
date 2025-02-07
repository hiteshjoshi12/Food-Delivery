import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Recipe from "./components/Recipe/Recipe";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import MyOrders from "./pages/MyOrders/MyOrders";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin ={setShowLogin} />:<></>}
    <div className="w-[80%] m-auto">
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/order" element={<PlaceOrder />}/>
        <Route path="/recipe" element={<Recipe />}/>
        <Route path="/myorders" element={<MyOrders />}/>
      </Routes>
    </div>
      <Footer />
    </>
  );
};

export default App;
