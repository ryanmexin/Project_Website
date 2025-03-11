import React, { useState } from "react";
import {
  fetchRandomRecipes,
  fetchRecipesByIngredients,
  fetchMealPlan,
  fetchRecipesExcludingIngredients,
} from "../utils/foodApi";
import "../Food.css";

function Food() {
  const [mealPlan, setMealPlan] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [excludeIngredients, setExcludeIngredients] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch random recipes
  const handleFetchRandomRecipes = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchRandomRecipes();
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch random recipes.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes by ingredients
  const handleFetchRecipesByIngredients = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await fetchRecipesByIngredients(ingredients);
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes by ingredients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipes excluding ingredients
  const handleFetchRecipesExcludingIngredients = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await fetchRecipesExcludingIngredients(
        ingredients,
        excludeIngredients
      );
      setRecipes(data);
    } catch (err) {
      setError("Failed to fetch recipes excluding ingredients.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch meal plan
  const handleFetchMealPlan = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchMealPlan();
      setMealPlan(data);
    } catch (err) {
      setError("Failed to fetch meal plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="food-container">
      <h2>Meal Planner App</h2>

      <div className="actions">
        <button
          onClick={handleFetchRandomRecipes}
          className="random-search-btn"
        >
          Get Random Recipes
        </button>
        <button onClick={handleFetchMealPlan} className="mealplan-search-btn">
          Generate Meal Plan
        </button>
      </div>

      {/* Form for searching recipes by ingredients */}
      <form className="actions" onSubmit={handleFetchRecipesByIngredients}>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (comma-separated)"
          className="ingredient-input"
        />
        <button type="submit" className="ingredient-search-btn">
          Search Recipes by Ingredients
        </button>
      </form>

      {/* Form for searching recipes excluding ingredients */}
      <form
        className="actions"
        onSubmit={handleFetchRecipesExcludingIngredients}
      >
        <input
          type="text"
          value={excludeIngredients}
          onChange={(e) => setExcludeIngredients(e.target.value)}
          placeholder="Exclude ingredients (comma-separated)"
          className="ingredient-input"
        />
        <button type="submit" className="ingredient-search-btn">
          Search Excluding Ingredients
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display random recipes */}
      {recipes.length > 0 && (
        <>
          <h3 className="suggestion-title">Recipe Suggestions</h3>
          <div className="recipes">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe">
                <h3 className="recipe-title">{recipe.title}</h3>
                {/* Conditionally render servings and prep time for random recipes */}
        {recipe.servings && <p>Servings: {recipe.servings}</p>}
        {recipe.readyInMinutes && <p>Prep Time: {recipe.readyInMinutes} Minutes</p>}
                <img src={recipe.image} alt={recipe.title} />
                <p>
                  <a
                    className="a-recipe"
                    href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </a>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Display meal plan */}
      {mealPlan && (
        <div className="meal-plan">
          <h3 className="suggestion-title">Daily Meal Plan</h3>
          {mealPlan.meals.map((meal) => (
            <h3 key={meal.id}>
              {meal.title} -{" "}
              <a
                className="a-recipe"
                href={meal.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Recipe
              </a>
            </h3>
          ))}
        </div>
      )}
    </div>
  );
}

export default Food;
