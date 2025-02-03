//* Export render function
export const renderArticle = newsObj => {
    return `
    <li class="article-item">
        <a class="aricle-title" href="${newsObj.url}" target="_blank">${newsObj.title} - ${newsObj.source}</a>

        <img class="article-image" src="${newsObj.image_url}" alt="news-image">

        <p class="article-description">${newsObj.description}</p>
        <p class="article-content">${newsObj.snippet}</p>

        <p class="article-date">${newsObj.published_at}</p>
    </li>
    `
}