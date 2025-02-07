import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./component/Navbar/Navbar";
import Sidebar from "./component/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "https://food-delivery-ekul.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // ✅ Redirect if user is not logged in or not an admin
    if (!token || role !== "admin") {
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
