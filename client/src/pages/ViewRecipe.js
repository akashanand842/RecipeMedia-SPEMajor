import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { BsFillStarFill } from "react-icons/bs";

export const ViewRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipeID = location.state.recipeID;
  const page = location.state.page;
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const [recipe, setRecipe] = useState([]);
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0);

  const handleStars = async (e) => {
    setStar(e);
    alert(`${e}` + " stars given");
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/recipes/rate`,
        {
          recipeID: recipeID,
          userID: userID,
          rating: e,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
    } catch (err) {
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
          cmt,
          {
            headers: { authorization: cookies.access_token },
          }
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
          `${process.env.REACT_APP_BACKEND_URL}/recipes/get-recipe/${recipeID}`,
          {
            headers: { authorization: cookies.access_token },
          }
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
      <div className="gridd1">
        <ul>
          <div className="card1">
            <li key={recipe._id}>
              <div>
                {star === 0 ? (
                  <>
                    <h2>Please Rate</h2>
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
                    <h2>
                      Rated {star} <BsFillStarFill color="#ffd700" />{" "}
                    </h2>
                  </>
                )}
                <h2>{recipe.name}</h2>
                <button
                  className="goBackButton"
                  onClick={() => {
                    goBack();
                  }}
                >
                  Back
                </button>
              </div>
              <div className="instructions">
                <h4>Instructions</h4>
                <li>{recipe.instructions}</li>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />

              <h4>Ingredients</h4>
              <div className="comment">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
              </div>
              <h4>Time</h4>
              <li>Cooking Time: {recipe.cookingTime} minutes</li>
              <h4>Comments</h4>
              <div className="comment">
                {recipe.comments &&
                  recipe.comments.map((comment, idx) => (
                    <li key={idx}>{comment.comment}</li>
                  ))}
              </div>
              <div className="comment-form">
                <input
                  type="text"
                  placeholder="Enter your comment here..."
                  onChange={(event, idx) => {
                    setComment(event.target.value);
                  }}
                />
                <button
                  className="comment-submit-button"
                  onSubmit={() => {
                    submitComment();
                  }}
                >
                  Submit
                </button>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

// export const Comment = (obj) => {
//   console.log(obj);
//   return <div></div>;
// };
