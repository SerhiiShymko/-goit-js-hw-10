import './sass/main.scss';
import { getImages } from './js/apiClient.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { onRenderGallery } from './js/renderGallery.js';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('[type="text"]'),
  btnSearch: document.querySelector('[type="submit"]'),
  btnLoad: document.querySelector('.load-more'),
  galleryItems: document.querySelector('.gallery'),
  textCollections: document.querySelector('.text-Collections'),
};

let searchQuery = '';
let currentPage = 1;
let currentHits = 0;
let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', submitSearchForm);

async function submitSearchForm(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value.trim();
  currentPage = 1;

  if (searchQuery === '') {
    Notify.warning('Please, fill the main field');
    return;
  }

  const response = await getImages(searchQuery, currentPage);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    refs.btnLoad.classList.remove('is-hidden');
  } else {
    refs.btnLoad.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      refs.galleryItems.innerHTML = '';
      onRenderGallery(response.hits);
      lightbox.refresh();
      refs.textCollections.classList.add('is-hidden');
    }
    if (response.totalHits === 0) {
      refs.galleryItems.innerHTML = '';
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.btnLoad.classList.add('is-hidden');
      refs.textCollections.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

refs.btnLoad.addEventListener('click', clickBtnLoad);

async function clickBtnLoad() {
  currentPage += 1;
  const response = await getImages(searchQuery, currentPage);
  onRenderGallery(response.hits);
  lightbox.refresh();
  currentHits += response.hits.length;

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

  if (currentHits === response.totalHits) {
    refs.btnLoad.classList.add('is-hidden');
    refs.textCollections.classList.remove('is-hidden');
  }
}
