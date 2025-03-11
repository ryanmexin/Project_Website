import axios from "axios";

//Giant Bomb gaming API key
const apiKey= "b20c091549b97e50c0cbfd9e4e2cfd189ada159c";
const baseURL = "https://www.giantbomb.com/api/accessory";

//function to fetch gaming data
export const fetchGamingInfo = async (guid) => {
    try{
        const url = `${baseURL}/${guid}/?api_key=${apiKey}&format=json`;
        const response = await axios.get(url);
        console.log(response)
        return response
    }   catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
      }

};