//TODO: Пошук новин з NewsAPI

//* Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

//* Import modules
import { fetchNews, fetchNewsByFilter, fetchNewsByCategory, fetchNewsByCategoryAndFilter} from "./js/news-api";
import { renderArticle } from "./js/render-functions";

//* Find elements
const formEl = document.querySelector('.news-form');
const inputEl = document.querySelector('.news-input');
const buttonEl = document.querySelector('.search-news-btn');
const newsListEl = document.querySelector('.news-list');
const loadMoreButtonEl = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-more');

//* SortByDate settings
const checkboxEl = document.querySelector('#theme-switch');
let sortByDate = false;

const onCheckboxClick = event => {
    if (checkboxEl.checked) {
        sortByDate = true;
    } else {
        sortByDate = false;
    }
}

checkboxEl.addEventListener('click', onCheckboxClick); 

//* SortByCategory settings
const selectCategoryEl = document.querySelector('.category-select');
let FetchCategory = 'default';

selectCategoryEl.addEventListener('input', event => {
    FetchCategory = selectCategoryEl.value;
})

//* Function
let page = 1;
let userQuery;
let totalPages;

const onFormSubmit = async event => {
    event.preventDefault();

    loadMoreButtonEl.classList.add('is-hidden');
    page = 1;
    userQuery = inputEl.value.trim();
    localStorage.setItem('userQuery', userQuery);
    
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
        loader.classList.remove('hidden');

        let newsData;
        if (sortByDate && FetchCategory !== 'default') {
            newsData = await fetchNewsByCategoryAndFilter(userQuery, page, FetchCategory);
        } else if (sortByDate) {
            newsData = await fetchNewsByFilter(userQuery, page);
        }  else if (FetchCategory !== 'default') {
            newsData = await fetchNewsByCategory(userQuery, page, FetchCategory);
        } else {
            newsData = await fetchNews(userQuery, page);
        }

        loader.classList.add('hidden');

        if (newsData.data.meta.found === 0) {
            iziToast.error({
                title: 'Error',
                titleSize: '25',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                messageSize: '15',
                position: 'bottomRight'
            });
            return;
        }

        newsListEl.innerHTML = ''
        const newsHTML = [];
        newsData.data.data.forEach(element => {
            newsHTML.push(renderArticle(element));
        });
        
        newsListEl.insertAdjacentHTML('beforeend', newsHTML.join(''))

        window.scrollBy({
            top: 500,
            left: 0,
            behavior: "smooth",
        });

        totalPages = Math.ceil(newsData.data.meta.found / 3);
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

        return;
    }
};

const onLoadMoreBtnClick = async event => {
    try {
        page++;

        loaderMore.classList.remove('hidden');

        let newsData;
        if (sortByDate && FetchCategory !== 'default') {
            newsData = await fetchNewsByCategoryAndFilter(userQuery, page, FetchCategory);
        } else if (sortByDate) {
            newsData = await fetchNewsByFilter(userQuery, page);
        }  else if (FetchCategory !== 'default') {
            newsData = await fetchNewsByCategory(userQuery, page, FetchCategory);
        } else {
            newsData = await fetchNews(userQuery, page);
        }

        loaderMore.classList.add('hidden');

        const newsHTML = []
        newsData.data.data.forEach(element => {
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

//* Restore user query
const restoreUserQuery = () => {
    const userQueryFromLS = localStorage.getItem('userQuery');

    if(userQueryFromLS === null){
        return;
    }

    inputEl.value = userQueryFromLS;
    onFormSubmit(new Event('submit'));
}

restoreUserQuery()

//* Add event listener 
formEl.addEventListener('submit', onFormSubmit)