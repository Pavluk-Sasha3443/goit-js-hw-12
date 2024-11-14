export default function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery">
        <a class="photo-link" href="${largeImageURL}">
                <img class="photo" src="${webformatURL}" alt="${tags} width="360">
        </a>
        <ul class="list-item">
           <li class="item-text">
                <h2 class="item-title">Likes</h2>
                <p class ="item-text">${likes}</p>
           </li>
          <li class="item-text">
                <h2 class="item-title">Views</h2>
                <p class ="item-text">${views}</p>
          </li>
         <li class="item-text">
                <h2 class="item-title">Comments</h2>
                <p class ="item-text">${comments}</p>
         </li>
         <li class="item-text">
                <h2 class="item-title">Downloads</h2>
                <p class ="item-text">${downloads}</p>
         </li>
     </ul>
     </div>
        `;
      }
    )
    .join('');
}
