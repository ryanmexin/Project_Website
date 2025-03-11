import React, { useState } from "react";
import { fetchNasaData } from "../utils/NasaApi";

function Nasa() {
  const [nasaPlanet, setNasaPlanet] = useState(""); // For user input
  const [nasaData, setNasaData] = useState(null); // For fetched data
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For loading state

  // Handle form submission
  const handleFetchData = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError(null); // Clear any previous errors
    setLoading(true); // Indicate data fetching

    try {
      const data = await fetchNasaData(nasaPlanet); // Call the API function with user input
      console.log("Fetched NASA Data:", data); // Log data for debugging
      setNasaData(data); // Update state with the fetched data
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="nasa-container">
      <h2>NASA Data Explorer</h2>
      {/* Input Form */}
      <form onSubmit={handleFetchData}>
        <input
          type="text"
          value={nasaPlanet}
          onChange={(e) => setNasaPlanet(e.target.value)}
          placeholder="Enter a date (YYYY-MM-DD)"
          className="nasa-input"
        />
        <button type="submit" className="nasa-submit-btn">
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Fetched Data Display */}
      {nasaData && (
        <div className="nasa-data">
          <h3>Results:</h3>
          <pre>{JSON.stringify(nasaData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Nasa;
