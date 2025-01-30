//TODO: Пошук новин з NewsAPI

//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

//* Import modules
import { fetchNews, fetchNewsByFilter } from "./js/news-api";
import { renderArticle } from "./js/render-functions";

//* Find elements
const formEl = document.querySelector('.news-form');
const inputEl = document.querySelector('.news-input');
const buttonEl = document.querySelector('.search-news-btn');
const newsListEl = document.querySelector('.news-list');
const loadMoreButtonEl = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');

//* Loader settings
const checkboxEl = document.querySelector('#theme-switch');
let sortByDate = false;

const onCheckboxClick = event => {
    console.log(checkboxEl.checked);
    if (checkboxEl.checked) {
        sortByDate = true;
    } else {
        sortByDate = false;
    }
}

checkboxEl.addEventListener('click', onCheckboxClick); 

//* Function & Event listener
let page = 1;
let userQuery;
let totalPages;

const onFormSubmit = async event => {
    event.preventDefault();
    
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
        loadMoreButtonEl.classList.add('is-hidden');
        page = 1;
        userQuery = inputEl.value.trim();

        loader.classList.remove('hidden');

        let newsData;
        if (sortByDate) {
            newsData = await fetchNewsByFilter(userQuery, page);
        } else {
            newsData = await fetchNews(userQuery, page);
        }

        loader.classList.add('hidden');

        if (newsData.data.totalResults === 0) {
            iziToast.error({
                title: 'Error',
                titleSize: '25',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                messageSize: '15',
                position: 'bottomRight'
            });
            return;
        }

        console.log(newsData.data.articles);

        newsListEl.innerHTML = ''
        const newsHTML = [];
        newsData.data.articles.forEach(element => {
            newsHTML.push(renderArticle(element));
        });
        
        console.log(newsHTML);
        newsListEl.insertAdjacentHTML('beforeend', newsHTML.join(''))

        window.scrollBy({
            top: 500,
            left: 0,
            behavior: "smooth",
        });

        totalPages = Math.ceil(newsData.data.totalResults / newsHTML.length);
        iziToast.success({
            message: `Sucess! ${totalPages * newsHTML.length} news are found!`,
            messageSize: '30',
            position: 'bottomRight'
        });
        
        if (totalPages <= 1) {
            return;
        }
        else if (page <= totalPages) {
                if (page === totalPages) {
                    loadMoreBtn.classList.add('is-hidden');
                    loadMoreButtonEl.addEventListener('click', onLoadMoreBtnClick);
                    return;
                }

            loadMoreButtonEl.classList.remove('is-hidden');

            loadMoreButtonEl.removeEventListener('click', onLoadMoreBtnClick);
            loadMoreButtonEl.addEventListener('click', onLoadMoreBtnClick);
        }
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

const onLoadMoreBtnClick = async event => {
    try {
        page++;
        console.log(page);

        loaderMore.classList.remove('hidden');

        const newsData = await fetchNews(userQuery, page);

        loaderMore.classList.add('hidden');

        const newsHTML = []
        newsData.data.articles.forEach(element => {
            newsHTML.push(renderArticle(element));
        })

        newsListEl.insertAdjacentHTML('beforeend', newsHTML.join(''));

        const newsItem = document.querySelector('.article-item');
        const rect = newsItem.getBoundingClientRect()

        window.scrollBy({
            top: rect.height,
            left: 0,
            behavior: "smooth",
        });

        if (page === totalPages) {
            iziToast.info({
                    title: '',
                    titleSize: '25',
                    message: "We're sorry, but you've reached the end of search results.",
                    messageSize: '20',
                    position: 'bottomRight'
            });

            loadMoreButtonEl.classList.add('is-hidden');
            loadMoreButtonEl.removeEventListener('click', onLoadMoreBtnClick);
            return;
    }
    } catch (err) {
        console.log(err);
    }
}

formEl.addEventListener('submit', onFormSubmit)