import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./component/Navbar/Navbar";
import Sidebar from "./component/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import {ToastContainer, toast } from "react-toastify";

const App = () => {
  const url = "https://food-delivery-ekul.onrender.com";
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role")?.toLowerCase();


    if (!storedToken) {
        toast.warning("No token found, staying on frontend.");
        return;
    }
    if (storedRole === "admin") {
        toast.success("Redirecting to Admin Panel...");
        window.location.href = "https://food-delivery-admin-6kig.onrender.com";
    } else {
        toast.error(" Redirecting to Frontend...");
        window.location.href = "https://food-delivery-frontend-ed5x.onrender.com";
    }
}, []);


  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
