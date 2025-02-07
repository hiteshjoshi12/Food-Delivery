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
      <ToastContainer />
      
      {/* Login Popup (Centered) */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <LoginPopup setShowLogin={setShowLogin} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <Navbar setShowLogin={setShowLogin} />
        <main className="flex-1 w-[90%] md:w-[80%] mx-auto py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
        </main>
        
        {/* Footer (Sticky at Bottom) */}
        <Footer />
      </div>
    </>
  );
};

export default App;
