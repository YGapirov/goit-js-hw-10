import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './style.css';

   const breedSelect = document.querySelector('.breed-select');
   const loader = document.querySelector('.loader');
   const error = document.querySelector('.error');
   const catInfo = document.querySelector('.cat-info');

   loader.classList.replace('loader', 'is-hidden');
   error.classList.add('is-hidden');
   catInfo.classList.add('is-hidden');



// div.cat-info з'являється зображення і розгорнута інформація про кота: назва породи, опис і темперамент.
// image:
// name: 
// description:
// temperament:

