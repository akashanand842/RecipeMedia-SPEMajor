import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipes">Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/">Login/Register</Link>
      ) : (
        <button type="button" class="btn btn-secondary btn-lg" style={{width:"100px", height:"30px", fontSize:"large"}} onClick={logout}> Logout </button>
      )}
    </div>
  );
};
