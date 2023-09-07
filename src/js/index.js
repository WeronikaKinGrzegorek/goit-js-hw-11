import { searchImages } from './img-api';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const searchForm = document.querySelector('#search-form');
const input = document.querySelector('#search-form input');
const searchButton = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.classList.add('is-hidden');

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const searchResult = await searchImages(input.value);

    if (searchResult.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          timeout: 4000,
          fontSize: '15px',
        }
      );
    } else {
      console.log('search results:', searchResult);
      Notiflix.Notify.success(
        `Hooray! We found ${searchResult.totalHits} images.`,
        {
          timeout: 4000,
          fontSize: '15px',
        }
      );
      let galleryOfSearchResults = '';
      searchResult.hits.forEach(hit => {
        galleryOfSearchResults += `<div class="photo-card">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${hit.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${hit.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${hit.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${hit.downloads}</b>
          </p>
        </div>
      </div>`;
      });
      gallery.innerHTML = galleryOfSearchResults;
      loadMoreButton.classList.remove('is-hidden');
    }
  } catch (error) {
    console.error(error);
  }
});
