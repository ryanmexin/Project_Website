import React, { useState } from "react";
import { fetchMovieData } from "../utils/MovieApi"; // Import the API function
import "../Movie.css";

function Movie() {
    // State to track user input (movie title) and fetched movie data
    const [movieTitle, setMovieTitle] = useState(""); // For user input
    const [movieData, setMovieData] = useState(null); // For fetched movie data
    const [error, setError] = useState(null); // For error handling

    // Function to handle form submission and fetch movie data
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        setError(null); // Clear previous errors
        setMovieData(null); // Clear previous movie data

        if (!movieTitle.trim()) {
            setError("Please enter a movie title."); // Validate input
            return;
        }

        try {
            const data = await fetchMovieData(movieTitle); // Fetch movie data
            setMovieData(data); // Update state with fetched data
        } catch (err) {
            setError(err.message); // Handle errors like "Movie not found"
        }
    };

    return (
        <div className="movie-container">
            <h2 className="movie-header">Movie Search App</h2>
            <form className="movie-search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter a Movie"
                    className="movie-search-input"
                    value={movieTitle}
                    onChange={(e) => setMovieTitle(e.target.value)} // Update input value
                />
                <button type="submit" className="movie-search-button">
                    Search
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>} {/* Show errors */}
            {movieData && ( // Show movie details if data exists
                <div className="movie-details">
                    <h3>{movieData.Title} ({movieData.Year})</h3>
                    <img src={movieData.Poster} alt={`${movieData.Title} poster`} />
                    <p><strong>Genre:</strong> {movieData.Genre}</p>
                    <p><strong>Director:</strong> {movieData.Director}</p>
                    <p><strong>Actors/Actresses:</strong>{movieData.Actors}</p>
                    <p><strong>Plot:</strong> {movieData.Plot}</p>
                    
                </div>
            )}
        </div>
    );
}

export default Movie;
