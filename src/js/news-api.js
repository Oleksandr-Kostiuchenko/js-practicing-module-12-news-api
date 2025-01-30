//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

//* Export fetch function
export const fetchNews = async (userQuery, page) => {
    const galleryData = await axios.get(`https://newsapi.org/v2/everything?q=${userQuery}&apiKey=ee921bec82754786b568b8b5c41f6003&pageSize=15&page=${page}`);

    return galleryData;
}

//* Export fetch function with filter
export const fetchNewsByFilter = async (userQuery, page) => {
    const galleryData = await axios.get(`https://newsapi.org/v2/everything?q=${userQuery}&apiKey=ee921bec82754786b568b8b5c41f6003&pageSize=15&page=${page}&sortBy=publishedAt`);

    return galleryData;
}