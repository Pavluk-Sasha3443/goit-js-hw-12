import fetchData from './js/pixabay-api';
import createMarkup from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.btn-load-more');

form.addEventListener('submit', querySearch);
loadMore.addEventListener('click', () =>
  onLoadMore(form.elements.query.value.trim())
);

let lightbox;
let page = 1;
const perPage = 15;

async function querySearch(event) {
  event.preventDefault();
  page = 1;
  loader.style.display = 'block';
  gallery.innerHTML = '';
  const query = event.target.elements.query.value.trim();
  loadMore.classList.add('visually-hidden');

  if (query === '') {
    iziToast.show({
      title: 'Error',
      message:
        'Sorry, you need to enter data for the request. Please try again!',
      position: 'topRight',
      color: 'red',
    });
    loader.style.display = 'none';
    return;
  }

  await fetchData(query, page, perPage)
    .then(({ hits }) => {
      if (hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          color: 'red',
        });

        loader.style.display = 'none';
        return;
      }

      gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
      loader.style.display = 'none';
      loadMore.classList.remove('visually-hidden');

      if (hits.length < perPage) {
        loadMore.classList.add('visually-hidden');
      } else {
        loadMore.classList.remove('visually-hidden');
      }

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a');
      }
    })
    .catch(error => {
      console.log(error);

      iziToast.show({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        color: 'red',
      });
    });
}

async function onLoadMore(query) {
  page++;
  loadMore.classList.add('visually-hidden');
  loader.style.display = 'block';

  try {
    const { hits, totalHits } = await fetchData(query, page, perPage);
    gallery.insertAdjacentHTML('beforeend', createMarkup(hits));

    if (lightbox) {
      lightbox.destroy();
    }
    lightbox = new SimpleLightbox('.gallery a');

    loadMore.classList.remove('visually-hidden');

    if (page * perPage >= totalHits) {
      loadMore.classList.add('visually-hidden');
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        color: 'blue',
      });
    }
    const card = document.querySelector('.gallery');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}
