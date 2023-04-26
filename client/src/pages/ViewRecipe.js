import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { BsFillStarFill } from "react-icons/bs";

export const ViewRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipeID = location.state.recipeID;
  const page = location.state.page;
  const userID = window.localStorage.getItem("userID");
  const [recipe, setRecipe] = useState([]);
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0);

  const handleStars = async (e) => {
    setStar(e);
    alert(`${e}` + " stars given");
    try{
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/rate`,{
          recipeID: recipeID,
          userID: userID,
          rating: e
        }
      );
    }
    catch(err){
      console.error(err);
    }
  };

  const goBack = () => {
    navigate(page);
  };

  const submitComment = async () => {
    if (comment !== "") {
      try {
        const cmt = {
          recipeID: recipeID,
          userID: userID,
          comment: comment,
        };
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/comment`,
          cmt
        );
        const comments = [
          ...recipe.comments,
          {
            user: userID,
            comment: comment,
            _id: recipeID,
          },
        ];
        console.log(comments);
        setRecipe({ ...recipe, comments });
        console.log(recipe);
      } catch (err) {
        console.error(err);
      }
    }
  };
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/recipes/get-recipe/${recipeID}`
        );
        console.log(response.data);
        setRecipe(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();
  }, []);

  // if already rated !!
  useEffect(() => {
    if (recipe && recipe.ratings) {
      const ratingObject = recipe.ratings.find(
        (r) => r.user.toString() === userID
      );
      if (ratingObject) {
        console.log("RaingObj");
        console.log(ratingObject.rating);
        setStar(ratingObject.rating);
        console.log("stars value = ");
        console.log(star);
      }
    }
  }, [recipe]);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        <li key={recipe._id}>
          <div>
            <h2>{recipe.name}</h2>
            <button
              onClick={() => {
                goBack();
              }}
            >
              Back
            </button>
          </div>
          <div className="instructions">
            <h4>Instructions</h4>
            <p>{recipe.instructions}</p>
          </div>
          <img src={recipe.imageUrl} alt={recipe.name} />

          <h4>Ingredients</h4>
          {recipe.ingredients &&
            recipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          <h4>Time</h4>
          <p>Cooking Time: {recipe.cookingTime} minutes</p>
          <h4>Comments</h4>
          {recipe.comments &&
            recipe.comments.map((comment, idx) => (
              <li key={idx}>{comment.comment}</li>
              // <p>
              //   {idx + 1}. {comment.comment}
              // </p>
            ))}
          <div>
            <input
              type="text"
              onChange={(event, idx) => {
                setComment(event.target.value);
              }}
            />
            <button
              onClick={() => {
                submitComment();
              }}
            >
              Submit
            </button>
            {star === 0 ? (
              <>
                <h4>Please Rate</h4>
                <ReactStars
                  count={5}
                  onChange={(e) => {
                    handleStars(e);
                  }}
                  size={40}
                  activeColor="#ffd700"
                />
              </>
            ) : (
              <>
                <h3>Rated {star} <BsFillStarFill color="#ffd700"/> </h3>
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

// export const Comment = (obj) => {
//   console.log(obj);
//   return <div></div>;
// };
