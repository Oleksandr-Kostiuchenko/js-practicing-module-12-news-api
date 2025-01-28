//TODO: Пошук новин з NewsAPI

//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

//* Import modules
import { fetchNews } from "./js/news-api";
import { renderArticle } from "./js/render-functions";

//* Find elements
const formEl = document.querySelector('.news-form');
const inputEl = document.querySelector('.news-input');
const buttonEl = document.querySelector('.search-news-btn');
const newsListEl = document.querySelector('.news-list');

//* Function & Event listener
let page = 1;
let userQuery;

const onFormSubmit = async event => {
    event.preventDefault();
    
    page = 1;
    userQuery = inputEl.value.trim();
    
    if (userQuery === '') {
        iziToast.error({
            title: 'Error',
            titleSize: '35',
            message: 'Please fill the gap!',
            messageSize: '30',
            position: 'bottomRight'
        });
        return;
    }

    try {
        const galleryData = await fetchNews(userQuery, page);

        console.log(galleryData.data.articles);

        newsListEl.innerHTML = ''
        const newsHTML = [];
        galleryData.data.articles.forEach(element => {
            newsHTML.push(renderArticle(element));
        });
        
        console.log(newsHTML);
        newsListEl.insertAdjacentHTML('beforeend', newsHTML.join(''))
    } catch (err) {
        iziToast.error({
            message: 'Sorry! Something went wrong(',
            messageSize: '30',
            position: 'bottomRight'
        });
        console.log(err);

        return;
    }
};

formEl.addEventListener('submit', onFormSubmit)