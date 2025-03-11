import axios from "axios";

// NASA API key
const apiKey = "SwDc9P4VSpfV6licmOCNAOChczqFzm9V6PZ7UZIm";

// Function to fetch NASA data
export const fetchNasaData = async (query) => {
  try {
    // Use the query parameter in the API URL
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${query}`;

    // Fetch data using Axios
    const response = await axios.get(url);

    // Return the fetched data
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error.message);
    throw error; // Re-throw error to handle it elsewhere if needed
  }
};
