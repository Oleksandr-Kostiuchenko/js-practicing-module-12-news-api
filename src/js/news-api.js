//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

//* Export fetch function
export const fetchNews = async (userQuery, page) => {
    const galleryData = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=tcUbeilVimWPJx0gGV8QbLAhmBB3OykRPLRi7H5Z&search=${userQuery}&page=${page}&language=en`);

    return galleryData;
}

//* Export fetch function with filter
const dateToday = new Date();
const formattedDate = dateToday.toISOString().split('T')[0]

export const fetchNewsByFilter = async (userQuery, page) => {
    const galleryData = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=tcUbeilVimWPJx0gGV8QbLAhmBB3OykRPLRi7H5Z&search=${userQuery}&page=${page}&language=en&published_on=${formattedDate}&sort=published_on`);

    return galleryData;
}

//* Export fetch function with category
export const fetchNewsByCategory = async (userQuery, page, category) => {
    const galleryData = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=tcUbeilVimWPJx0gGV8QbLAhmBB3OykRPLRi7H5Z&search=${userQuery}&page=${page}&language=en&categories=${category}`);    

    return galleryData;
}

//* Export fetch function with filter and category
export const fetchNewsByCategoryAndFilter = async (userQuery, page, category) => {
    const galleryData = await axios.get(`https://api.thenewsapi.com/v1/news/all?api_token=tcUbeilVimWPJx0gGV8QbLAhmBB3OykRPLRi7H5Z&search=${userQuery}&page=${page}&language=en&published_on=${formattedDate}&sort=published_on&categories=${category}`);

    return galleryData;
}