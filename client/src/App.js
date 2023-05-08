import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Auth } from "./pages/Auth";
import { CreateRecipe } from "./pages/CreateRecipe";
import { Home } from "./pages/Home";
import { SavedRecipes } from "./pages/SavedRecipes";
import { ViewRecipe } from "./pages/ViewRecipe";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/" element={<Auth />} />
          <Route path="/view" element={<ViewRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
