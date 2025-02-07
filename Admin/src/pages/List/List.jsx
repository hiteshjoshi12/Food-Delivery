import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Network Error", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      toast.error("Network Error", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

 
  return (
    <div className="w-full max-w-[800px] mx-auto mt-8 text-gray-700 px-4">
      <p className="text-lg font-semibold mb-4">All Foods List</p>
      
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Table Headers - Visible on Large Screens */}
        <div className="hidden md:grid grid-cols-5 items-center gap-2 p-3 text-sm border-b bg-gray-100 font-semibold">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* Food List Items */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-2 md:grid-cols-5 items-center gap-2 p-3 text-sm border-b"
          >
            {/* Image */}
            <img src={`${url}/images/${item.image}`} alt={item.name} className="w-14 mx-auto md:w-12" />

            {/* Name */}
            <p className="text-center md:text-left">{item.name}</p>

            {/* Category */}
            <p className="hidden md:block">{item.category}</p>

            {/* Price */}
            <p className="font-medium text-center md:text-left">₹{item.price}</p>

            {/* Remove Button */}
            <p
              onClick={() => removeFood(item._id)}
              className="cursor-pointer text-red-500 font-bold text-center md:text-left"
            >
              ✕
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
