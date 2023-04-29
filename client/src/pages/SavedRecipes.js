import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const navigate = useNavigate();

  const removeRecipe = async (recipe) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/recipes`,
        {
          data: {
            recipeID: recipe._id,
            userID: userID,
          },
          headers: { authorization: cookies.access_token },
        }
      );
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
          `${process.env.REACT_APP_BACKEND_URL}/recipes/savedRecipes/${userID}`,
          {
            headers: { authorization: cookies.access_token },
          }
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
    <div className="save">
      <h1>Saved Recipes</h1>
      <div className="gridd">
        <ul>
          {savedRecipes.map((recipe) => (
            <div className="card">
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
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
