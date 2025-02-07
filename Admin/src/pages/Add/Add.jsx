import { useState } from "react";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false)
      toast.success(response.data.message)
    }
    else{
        toast.error(response.data.message)
    }
  };
  return (
    <div className="w-full max-w-[600px] mx-auto mt-10 text-gray-700 px-4">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-6">
        
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium">Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
              className="w-[120px] rounded-md shadow-md"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col">
          <p className="text-sm font-medium">Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-400"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col">
          <p className="text-sm font-medium">Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={4}
            placeholder="Write Content Here"
            required
            className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-400"
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Product Category */}
          <div className="flex flex-col">
            <p className="text-sm font-medium">Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-400"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* Product Price */}
          <div className="flex flex-col">
            <p className="text-sm font-medium">Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-3 rounded-md cursor-pointer hover:bg-orange-600 transition"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
