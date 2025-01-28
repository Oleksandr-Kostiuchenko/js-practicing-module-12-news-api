//* Export render function
export const renderArticle = newsObj => {
    return `
    <li class="article-item">
        <a class="aricle-title" href="${newsObj.url}" target="_blank">${newsObj.title} - ${newsObj.author}</a>

        <img class="article-image" src="${newsObj.urlToImage}" alt="news-image">

        <p class="article-description">${newsObj.description}</p>
        <p class="article-content">${newsObj.content}</p>

        <p class="article-date">${newsObj.publishedAt}</p>
    </li>
    `
}