import axios from "axios";

// My OMDb API key
const apiKey = "a54f894d";

// Function to fetch movie data
export const fetchMovieData = async (movieTitle) => {
    try {
        // API endpoint with query
        const response = await axios.get(
            `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`
        );
        console.log("API Response Data:", response.data); // Log all data here

        // Check if movie is found
        if (response.data.Response === "True") {
            return response.data; // Movie data
        } else {
            throw new Error(response.data.Error); // Handle errors (e.g., "Movie not found")
        }
    } catch (error) {
        console.error("Error fetching movie data:", error.message);
        throw error; // Re-throw to handle it in the calling function
    }
};