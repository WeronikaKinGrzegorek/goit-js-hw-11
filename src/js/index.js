import { searchImages } from './img-api';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const input = document.querySelector('#search-form input');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;

loadMoreButton.classList.add('is-hidden');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const searchResult = await searchImages(input.value);

    if (searchResult.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          timeout: 3000,
          fontSize: '15px',
        }
      );
    } else {
      console.log('search results:', searchResult);
      Notiflix.Notify.success(
        `Hooray! We found ${searchResult.totalHits} images.`,
        {
          timeout: 3000,
          fontSize: '15px',
        }
      );
      let galleryOfSearchResults = '';
      searchResult.hits.forEach(hit => {
        galleryOfSearchResults += `<div class="photo-card">
        <a href="${hit.largeImageURL}"><img class="img" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" width="400" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${hit.likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${hit.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${hit.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${hit.downloads}
          </p>
        </div>
      </div>`;
      });
      gallery.innerHTML = galleryOfSearchResults;
      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      currentPage = 1;
      loadMoreButton.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error(error);
  }
});

// loadMoreButton.addEventListener('click', loadMore);

// async function loadMore() {
//   const searchResult = await searchImages(input.value);
//   currentPage++;
//   try {

//   }
// }

loadMoreButton.classList.add('is-hidden');
