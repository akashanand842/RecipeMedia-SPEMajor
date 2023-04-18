import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();

  const removeRecipe = async (recipe) => {
    try {
      const response = await axios.delete("http://localhost:3001/recipes", {
        data: {
          recipeID: recipe._id,
          userID: userID,
        },
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const goToView = (recipe_id) => {
    console.log(recipe_id);
    navigate("/view", {
      state: { recipeID: recipe_id, page: "/saved-recipes" },
    });
  };
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                onClick={() => {
                  removeRecipe(recipe);
                }}
              >
                Remove
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
            <p>{recipe.description}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
