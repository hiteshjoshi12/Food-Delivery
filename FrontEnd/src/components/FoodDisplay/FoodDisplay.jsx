import { useContext } from "react";
import { StoreContext } from "../../context/StoreContex";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  console.log("FoodDisplay category:", food_list);

  return (
    <div className="mt-3 " id="foodDisplay">
      <h2 className="text-2xl font-semibold">Top dishes near you.</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {food_list &&
          food_list
            .filter((item) => category === "ALL" || item.category === category)
            .map((item, index) => (
              <FoodItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.imageUrl}
              />
            ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
