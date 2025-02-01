import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Recipe from "./components/Recipe/Recipe";
import Footer from "./components/Footer/Footer";


const App = () => {
  return (
    <>
    <div className="w-[80%] m-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/order" element={<PlaceOrder />}/>
        <Route path="/recipe" element={<Recipe />}/>
      </Routes>
    </div>
      <Footer />
    </>
  );
};

export default App;
