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

  const onChnageHandler = (event) => {
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
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-gray-500 text-[16px]">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
        <div className="flex flex-col items-start">
          <p>Upload Image</p>
          <label htmlFor="image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-[120px]"
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

        <div className="w-[max(40%,280px)] flex flex-col">
          <p>Product Name</p>
          <input
            onChange={onChnageHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="w-[max(40%,280px)] flex flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChnageHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder="Write Content Here"
            required
            className="p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col">
            <p>Product Category</p>
            <select
              onChange={onChnageHandler}
              name="category"
              className="max-w-[120px] p-2 border border-gray-300 rounded-md"
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

          <div className="flex flex-col">
            <p>Product Price</p>
            <input
              onChange={onChnageHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="₹20"
              className="max-w-[120px] p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="max-w-[120px] border-none p-2 bg-black text-white cursor-pointer rounded-md"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
