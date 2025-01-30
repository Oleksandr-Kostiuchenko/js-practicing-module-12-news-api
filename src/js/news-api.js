//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

//* Export fetch function
export const fetchNews = async (userQuery, page) => {
    const galleryData = await axios.get(`https://newsapi.org/v2/everything?q=${userQuery}&apiKey=ee921bec82754786b568b8b5c41f6003&pageSize=15&page=${page}`,{
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        }
    }
    );

    return galleryData;
}