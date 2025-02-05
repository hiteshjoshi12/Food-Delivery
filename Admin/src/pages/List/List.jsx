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
    <div className="flex flex-col w-[70%] ml-[max(5vw,25px)] mt-[50px] text-gray-500 text-[16px]">
      <p className="text-lg font-semibold">All Foods List</p>
      <div className="border border-gray-300 rounded-md">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 p-3 text-sm border-b bg-gray-100 font-semibold hidden md:grid">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2 p-3 text-sm border-b md:grid"
          >
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="w-[50px]"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p
              onClick={() => removeFood(item._id)}
              className="cursor-pointer text-red-500 font-bold"
            >
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
