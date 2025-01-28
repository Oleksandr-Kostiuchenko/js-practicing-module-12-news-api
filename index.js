import{a as d,i as a}from"./assets/vendor-4yCzdkXl.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const p=async(t,o)=>await d.get(`https://newsapi.org/v2/everything?q=${t}&apiKey=ee921bec82754786b568b8b5c41f6003`),f=t=>`
    <li class="article-item">
        <a class="aricle-title" href="${t.url}" target="_blank">${t.title} - ${t.author}</a>

        <img class="article-image" src="${t.urlToImage}" alt="news-image">

        <p class="article-description">${t.description}</p>
        <p class="article-content">${t.content}</p>

        <p class="article-date">${t.publishedAt}</p>
    </li>
    `,m=document.querySelector(".news-form"),g=document.querySelector(".news-input");document.querySelector(".search-news-btn");const l=document.querySelector(".news-list");let u=1,c;const y=async t=>{if(t.preventDefault(),u=1,c=g.value.trim(),c===""){a.error({title:"Error",titleSize:"35",message:"Please fill the gap!",messageSize:"30",position:"bottomRight"});return}try{const o=await p(c,u);console.log(o.data.articles),l.innerHTML="";const s=[];o.data.articles.forEach(i=>{s.push(f(i))}),console.log(s),l.insertAdjacentHTML("beforeend",s.join(""))}catch(o){a.error({message:"Sorry! Something went wrong(",messageSize:"30",position:"bottomRight"}),console.log(o);return}};m.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
