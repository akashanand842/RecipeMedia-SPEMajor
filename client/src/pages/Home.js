import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const userID = window.localStorage.getItem("userID");
  const goToView = (recipe_id) => {
    console.log(recipe_id);
    navigate("/view", {
      state: { recipeID: recipe_id, page: "/" },
    });
  };
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        const ratedRecipes = response.data.map((recipe) => {
          const ratings = recipe.ratings.map((r) => r.rating);
          const avgRating =
            ratings.reduce((total, rating) => total + rating, 0) /
            ratings.length;
          return { ...recipe, avgRating };
        });
        setRecipes(ratedRecipes);
        console.log(ratedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Recipes</h1>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name} </h2>
              {recipe.avgRating == 0 ? (<>Not Rated</>) : (<>{recipe.avgRating} <BsFillStarFill color="#ffd700"/></>)}
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => {
                  goToView(recipe._id);
                }}
              >
                {" "}
                View{" "}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
