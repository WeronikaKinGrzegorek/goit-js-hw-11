import { searchImages } from './img-api';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { smoothScroll } from './smoothScroll';

const searchForm = document.querySelector('#search-form');
const input = document.querySelector('#search-form input');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

// loadMoreButton.classList.add('is-hidden');

let currentPage = 0;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  gallery.innerHTML = '';
  await drawGallery();
});

async function drawGallery() {
  try {
    currentPage += 1;
    const searchResult = await searchImages(input.value, currentPage);

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
      gallery.innerHTML += galleryOfSearchResults;

      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      }).refresh();

      setTimeout(() => {
        smoothScroll();
      }, 0);

      const lastPage = Math.ceil(searchResult.totalHits / 40);

      if (currentPage === lastPage) {
        loadMoreButton.classList.add('is-hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results.",
          {
            timeout: 3000,
            fontSize: '15px',
          }
        );
        return;
      } else {
        loadMoreButton.classList.remove('is-hidden');
      }
    }
  } catch (error) {
    console.error(error);
  }
}

loadMoreButton.addEventListener('click', drawGallery);
