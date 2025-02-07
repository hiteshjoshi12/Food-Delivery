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
    // ✅ Ensure localStorage has the latest values
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role")?.toLowerCase(); // ✅ Convert to lowercase for safety

    console.log("🔹 Token:", storedToken);
    console.log("🔹 Role:", storedRole);

    if (!storedToken) {
        console.warn("❌ No token found, staying on frontend.");
        return;
    }

    if (storedRole === "admin") {
        console.log("✅ Redirecting to Admin Panel...");
        window.location.href = "https://food-delivery-admin-6kig.onrender.com";
    } else {
        console.log("✅ Redirecting to Frontend...");
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
