//* Export render function
export const renderArticle = newsObj => {
    const date = new Date(newsObj.published_at);
    const formattedDate = date.toISOString().split('T')[0];

    return `
    <li class="article-item">
        <a class="aricle-title" href="${newsObj.url}" target="_blank">${newsObj.title} - ${newsObj.source}</a>

        <img class="article-image" src="${newsObj.image_url}" alt="news-image">

        <p class="article-description">${newsObj.description}</p>
        <p class="article-content">${newsObj.snippet}</p>

        <p class="article-date">${formattedDate}</p>
    </li>
    `
}