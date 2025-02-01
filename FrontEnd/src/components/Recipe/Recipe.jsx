import axios from "axios";
import { useEffect, useState } from "react";

const Recipe = () => {
  const [cate, setCate] = useState([]);
  const [name, setName] = useState("");
  const [meals, setMeals] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => setCate(response.data.categories))
      .catch((error) => console.log("error", error));
  }, []);


  useEffect(() => {
    if (name) {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((response) => setMeals(response.data.meals))
        .catch((error) => console.log("error fetching meals", error));
    }
  }, [name]);

  const fetchRecipe = (mealId) => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => {
        setRecipe(response.data.meals[0]); 
        setShowModal(true); 
      })
      .catch((error) => console.log("error fetching recipe", error));
  };

  return (
    <div>
      {/* Category Selection */}
      <div className="flex justify-between items-center gap-8 m-5 mt-12 overflow-x-scroll">
        {cate.map((item, index) => (
          <div key={index} className="relative p-1">
            <img
              onClick={() => setName(item.strCategory)}
              className={`transition-all duration-300 ease-in-out 
          ${
            name === item.strCategory
              ? "border-4 w-[8.5vw] min-w-[140px] border-amber-600 rounded-full scale-105"
              : "w-[8.5vw] min-w-[140px] cursor-pointer rounded-full scale-100"
          }`}
              src={item.strCategoryThumb}
              alt={item.strCategory}
            />
            <p className="mt-2 text-[#747474] text-[max(1.4vw,16px)] cursor-pointer text-center">
              {item.strCategory}
            </p>
          </div>
        ))}
      </div>

      {/* Displaying Meals Based on Selected Category */}
      <div className="mt-5">
        <h2 className="text-xl font-bold">Meals in {name}</h2>
        <div className="grid grid-cols-3 gap-4">
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="p-4 border rounded-lg text-center"
            >
              <img
                onClick={() => fetchRecipe(meal.idMeal)}
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded-lg cursor-pointer"
              />
              <p className="mt-2">{meal.strMeal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal  */}
      {showModal && recipe && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center [animation:fadeIn_1s_ease-in-out]">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[60%] lg:w-[40%] shadow-lg relative max-h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full cursor-pointer "
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold text-center mb-2">
              {recipe.strMeal}
            </h2>

            <p className="text-center text-sm text-gray-500 mb-2">
              {recipe.strCategory} | {recipe.strArea}
            </p>

            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-[60%] mx-auto rounded-lg shadow-md mb-4"
            />

            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-gray-700 text-sm">
              {recipe.strInstructions.split(/\r\n|\n/).map((step, i) => {
                const cleanedStep = step.trim();
                if (cleanedStep) {
                  return <li key={i}>{cleanedStep.replace(/^\d+\./, "")}</li>;
                }
                return null;
              })}
            </ol>
            <h3 className="mt-4 font-semibold">Ingredients:</h3>
            <ul className="list-disc list-inside text-sm">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                return ingredient ? (
                  <li key={i}>
                    {measure} {ingredient}
                  </li>
                ) : null;
              })}
            </ul>

            {recipe.strSource && (
              <p className="mt-4 text-center">
                <a
                  href={recipe.strSource}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  View Full Recipe
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
