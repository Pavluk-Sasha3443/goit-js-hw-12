import{a as v,i as u,S as m}from"./assets/vendor-Qob_5Ba8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const b="https://pixabay.com/api/",w="46935717-685ea9342bebfa50d29cf3184";async function p(o,t,s){const{data:a}=await v.get(`${b}`,{params:{key:w,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s}});return a}function f(o){return o.map(({webformatURL:t,largeImageURL:s,tags:a,likes:e,views:r,comments:c,downloads:L})=>`<div class="gallery">
        <a class="photo-link" href="${s}">
                <img class="photo" src="${t}" alt="${a} width="360">
        </a>
        <ul class="list-item">
           <li class="item-text">
                <h2 class="item-title">Likes</h2>
                <p class ="item-text">${e}</p>
           </li>
          <li class="item-text">
                <h2 class="item-title">Views</h2>
                <p class ="item-text">${r}</p>
          </li>
         <li class="item-text">
                <h2 class="item-title">Comments</h2>
                <p class ="item-text">${c}</p>
         </li>
         <li class="item-text">
                <h2 class="item-title">Downloads</h2>
                <p class ="item-text">${L}</p>
         </li>
     </ul>
     </div>
        `).join("")}const g=document.querySelector(".form-search"),h=document.querySelector(".js-gallery"),l=document.querySelector(".loader"),i=document.querySelector(".btn-load-more");g.addEventListener("submit",q);i.addEventListener("click",()=>S(g.elements.query.value.trim()));let n,d=1;const y=15;async function q(o){o.preventDefault(),d=1,l.style.display="block",h.innerHTML="";const t=o.target.elements.query.value.trim();if(i.classList.add("visually-hidden"),t===""){u.show({title:"Error",message:"Sorry, you need to enter data for the request. Please try again!",position:"topRight",color:"red"}),l.style.display="none";return}await p(t,d,y).then(({hits:s})=>{if(s.length===0){u.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"red"}),l.style.display="none";return}h.insertAdjacentHTML("beforeend",f(s)),l.style.display="none",i.classList.remove("visually-hidden"),s.length<y?i.classList.add("visually-hidden"):i.classList.remove("visually-hidden"),n?n.refresh():n=new m(".gallery a")}).catch(s=>{console.log(s),u.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",color:"red"})})}async function S(o){d++,i.classList.add("visually-hidden"),l.style.display="block";try{const{hits:t,totalHits:s}=await p(o,d,y);h.insertAdjacentHTML("beforeend",f(t)),n&&n.destroy(),n=new m(".gallery a"),i.classList.remove("visually-hidden"),d*y>=s&&(i.classList.add("visually-hidden"),u.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",color:"blue"}));const e=document.querySelector(".gallery").getBoundingClientRect().height;window.scrollBy({left:0,top:e*2,behavior:"smooth"})}catch(t){console.log(t)}finally{l.style.display="none"}}
//# sourceMappingURL=index.js.map
