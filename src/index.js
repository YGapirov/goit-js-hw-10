import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  errorInfo: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info')
};

// Ініціалізація
init();

function init() {   
  showCustomLoader();
  
  fetchBreeds()
    .then(data => {
      const markupBreed = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
      elements.breedSelect.innerHTML = ('beforeend', markupBreed);    
      hideCustomLoader();
      elements.breedSelect.classList.remove('is-hidden');
      new SlimSelect({
        select: elements.breedSelect,
      });
      
    })
    .catch(error => {
       console.log(error);
       elements.errorInfo.classList.remove('is-hidden');
       elements.breedSelect.classList.add('is-hidden');
       elements.loader.classList.add('is-hidden');
    });

  // Зміна випадаючого списку
  elements.breedSelect.addEventListener('change', () => {
  const selectBreedId = elements.breedSelect.value;
    showCustomLoader();
    
  elements.loader.classList.remove('is-hidden');
  elements.catInfo.classList.add('is-hidden');
  elements.errorInfo.classList.add('is-hidden');

  fetchCatByBreed(selectBreedId)
    .then(data => {
      const img = data[0].url;
      const name = data[0].breeds[0].name;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;

      elements.catInfo.innerHTML = createCatCard(img, name, description, temperament);

      elements.loader.classList.add('is-hidden');
      elements.catInfo.classList.remove('is-hidden');
    })
    .catch(error => {
      hideCustomLoader();
      console.log(error);
      elements.loader.classList.add('is-hidden');
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', { position: 'center-top', distance: '200px' });
    });
});
}

function createCatCard(img, name, description, temperament){
hideCustomLoader();
    return `<div class='main-info'> <img src='${img}' width='300' alt='${name}'/>
    <h1>${name}</h1>
    <p>${description}</p>
    <h2>Temperament</h2>
    <p>${temperament}</p></div>`
  
}

// Custom loader
function showCustomLoader() {
  const customLoader = document.querySelector('.custom-loader');
  const loader = document.querySelector('.loader');
  if (customLoader) {
    customLoader.style.display = 'flex';
  }
   if (loader) {
    loader.style.display = 'flex';
  }
}

function hideCustomLoader() {
  const customLoader = document.querySelector('.custom-loader');
  const loader = document.querySelector('.loader');
  if (customLoader) {
    customLoader.style.display = 'none';
  }
  if (loader) {
    loader.style.display = 'none';
  }
}
