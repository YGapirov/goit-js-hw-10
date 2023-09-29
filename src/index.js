
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'


const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  errorInfo: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info')
};
//ініцалізація
init();

function init() {
   
   let breedsData;
   //отримання списку порід і обробка результату
   showCustomLoader();
    fetchBreeds()
    .then(data => {
        breedsData = data;
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
           elements.breedSelect.appendChild(option);
           
         // Показуємо випадаючий список і приховуємо завантажувач
            elements.breedSelect.classList.remove('is-hidden');
            elements.loader.classList.add('is-hidden');
        })
   //     new SlimSelect({
   //      select: elements.breedSelect,
   //      data: breedsData
   //  });
    })
    .catch(error => {
       console.log(error);
       // повідомлення про помилку і приховуємо випадаючий список та завантажувач
        elements.errorInfo.classList.remove('is-hidden');
        elements.breedSelect.classList.add('is-hidden');
        elements.loader.classList.add('is-hidden');
    })

   
   //значення випадаючого вікна і приховування лодера інфо і помилок
    elements.breedSelect.addEventListener('change', () => {
       const selectBreedId = elements.breedSelect.value;
       showCustomLoader();
        elements.loader.classList.remove('is-hidden');
        elements.catInfo.classList.add('is-hidden');
         elements.errorInfo.classList.add('is-hidden');
      //  Notiflix.Notify.failure('❌Oops! Something went wrong! Try reloading the page!', { position: 'center-top', distance: '200px'})

       
       // Запит на отримання інформації про кота та обробка результату
        fetchCatByBreed(selectBreedId)
        .then(result => {
            const catData = result[0];
            const breedData = breedsData.find(breed => breed.id === catData.breeds[0].id);

            const markup = createMarkup(catData, breedData);
            elements.catInfo.innerHTML = markup;

            elements.loader.classList.add('is-hidden');
            elements.catInfo.classList.remove('is-hidden');
        })
        .catch(error => {
            console.log(error);
            // elements.errorInfo.classList.remove('is-hidden');
           elements.loader.classList.add('is-hidden');
           Notiflix.Notify.failure('❌Oops! Something went wrong! Try reloading the page!', { position: 'center-top', distance: '200px'})
        })
    });
}

function createMarkup(catData, breedData){
    return `<div class='main-info'> <img src='${catData.url}' width='300' alt='${breedData.name}'/>
    <h1>${breedData.name}</h1>
    <p>${breedData.description}</p>
    <h2>Temperament</h2>
    <p>${breedData.temperament}</p></div>`
}


//custom-loader
function showCustomLoader() {
  const customLoader = document.querySelector('.custom-loader');
  if (customLoader) {
    customLoader.style.display = 'flex';
  }
}

