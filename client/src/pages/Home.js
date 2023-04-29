import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
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
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipes`,
          {
            headers: { authorization: cookies.access_token },
          }
        );
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
          `${process.env.REACT_APP_BACKEND_URL}/recipes/savedRecipes/ids/${userID}`,
          {
            headers: { authorization: cookies.access_token },
          }
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
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/recipes`,
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
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
      <div className="hss">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="gridd">
        <ul>
          {filteredRecipes.map((recipe) => (
            <div className="card">
              <li key={recipe._id}>
                <div>
                  <h2>
                  {recipe.avgRating == 0 ? (
                    <></>
                  ) : (
                    <>
                      {recipe.avgRating} <BsFillStarFill color="#ffd700" />
                    </>
                  )}
                  {" "}
                  {recipe.name} 
                  </h2>
                  
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
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
                    View
                  </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
