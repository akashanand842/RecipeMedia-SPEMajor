import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipesModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Create a new recipe  add this later on verifyToken,
router.post("/",  async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.image,
        ingredients: result.ingredients,
        instructions: result.instructions,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a particular recipe
  router.get("/get-recipe/:recipeID", async (req, res) => {
    try{
        const recipe = await RecipesModel.findById(req.params.recipeID);
        res.json(recipe);
    }
    catch(err){
        res.json(err);
    }
  });

// Save a Recipe
router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a saved recipe
router.delete("/", async (req, res) => {
  const recipeId = req.body.recipeID;
  const userId = req.body.userID;
  
  try {
    const user = await UserModel.findById(userId);
    const index = user.savedRecipes.indexOf(recipeId);
    if (index > -1) {
      user.savedRecipes.splice(index, 1);
      await user.save();
      const savedRecipes = await RecipesModel.find({
        _id: { $in: user.savedRecipes },
      });
      res.status(200).json({ savedRecipes });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Comment on recipe
router.put("/comment", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const userObj = await UserModel.findById(req.body.userID);
  const comment = {
    user: userObj,
    comment: req.body.comment,
  };
  try {
    recipe.comments.push(comment);
    await recipe.save();
    res.status(201).json({ recipe: recipe });
  } catch (err) {
    res.status(500).json(err);
  }
});

//rate a recipe
router.put("/rate", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const userObj = await UserModel.findById(req.body.userID);
  const rating = {
    user: userObj,
    rating: req.body.rating,
  };
  try {
    recipe.ratings.push(rating);
    await recipe.save();
    res.status(201).json({ recipe: recipe });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as recipesRouter };
