import axios from "axios";

// Spoonacular API key
const apiKey = "7f657ea48d85402e9ea4904e9822fc47";
const baseURL = "https://api.spoonacular.com";

// Function to fetch random recipes
export const fetchRandomRecipes = async (number = 6) => {
  try {
    const url = `${baseURL}/recipes/random?apiKey=${apiKey}&number=${number}`;
    const response = await axios.get(url);
    console.log(response.data.recipes);
    return response.data.recipes;
  } catch (error) {
    console.error("Error fetching random recipes:", error.message);
    throw error;
  }
};

// Function to fetch recipes based on ingredients
export const fetchRecipesByIngredients = async (ingredients) => {
  try {
    const url = `${baseURL}/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes by ingredients:", error.message);
    throw error;
  }
};


export const fetchRecipesExcludingIngredients = async (ingredients, excludeIngredients) => {
  try {
    const formattedIngredients = ingredients
      ? ingredients.split(',').map(item => item.trim()).join(',')
      : ""; // Format ingredients or use an empty string

    const formattedExcludeIngredients = excludeIngredients
      ? excludeIngredients.split(',').map(item => item.trim()).join(',')
      : ""; // Format excluded ingredients or use an empty string

    console.log("Formatted Ingredients:", formattedIngredients);
    console.log("Formatted Excluded Ingredients:", formattedExcludeIngredients);

    // Build the URL using the complexSearch endpoint
    let url = `${baseURL}/recipes/complexSearch?apiKey=${apiKey}`;
    if (formattedIngredients) {
      url += `&includeIngredients=${encodeURIComponent(formattedIngredients)}`;
    }
    if (formattedExcludeIngredients) {
      url += `&excludeIngredients=${encodeURIComponent(formattedExcludeIngredients)}`;
    }

    console.log("Request URL:", url); // Log the full URL for debugging

    const response = await axios.get(url);

    console.log("API Response Data:", response.data); // Log the API response
    if (!response.data.results || response.data.results.length === 0) {
      console.warn("No recipes found with the given ingredients and exclusions.");
    }

    return response.data.results; // Return the list of recipes
  } catch (error) {
    console.error("Error fetching recipes excluding ingredients:", error.message);
    throw error;
  }
};






// Function to fetch meal plan
export const fetchMealPlan = async () => {
  try {
    const url = `${baseURL}/mealplanner/generate?apiKey=${apiKey}&timeFrame=day`;
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching meal plan:", error.message);
    throw error;
  }
};
