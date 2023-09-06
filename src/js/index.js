import { searchImages } from './img-api';
import Notiflix from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('.search-button');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('click', e => {
  const userInput = e.target.value;

  return searchImages(userInput);
});
