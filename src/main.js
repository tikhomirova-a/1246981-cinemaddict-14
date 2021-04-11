import {createUserRankTemplate} from './view/user-rank.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortingTemplate} from './view/sorting.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createListTemplate} from './view/film-list.js';
import {createFilmsListContainerTemplate} from './view/films-list-container.js';
import {createCardTemplate} from './view/card.js';
import {createLoadMoreButtonTemplate} from './view/show-more-button.js';
import {createRatedListTemplate} from './view/rated-film-list.js';
import {createCommentedListTemplate} from './view/commented-film-list.js';
import {createFooterStatTemplate} from './view/footer-stat.js';
import {createPopapTemplate} from './view/popup.js';
import {generateMovie} from './mock/movie.js';
import {generateFilter} from './mock/filter.js';

const ALL_CARDS_AMOUNT = 18;
const EXTRA_CARDS_AMOUNT = 2;
const CARDS_PER_STEP = 5;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const movies = new Array(ALL_CARDS_AMOUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStat = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, createUserRankTemplate());
render(siteMainElement, createMenuTemplate(filters));
render(siteMainElement, createSortingTemplate());
render(siteMainElement, createFilmsContainerTemplate());

const filmsContainer = siteMainElement.querySelector('.films');
render(filmsContainer, createListTemplate());
render(filmsContainer, createRatedListTemplate());
render(filmsContainer, createCommentedListTemplate());

const filmsListElements = siteMainElement.querySelectorAll('.films-list');
filmsListElements.forEach((filmsListElement) => {
  render(filmsListElement, createFilmsListContainerTemplate());
});

const filmsListContainer = siteMainElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(movies.length, CARDS_PER_STEP); i++) {
  render(filmsListContainer, createCardTemplate(movies[i]));
}

const filmsList = siteMainElement.querySelector('.films-list');

if (movies.length > CARDS_PER_STEP) {
  let renderedCardsCount = CARDS_PER_STEP;
  render(filmsList, createLoadMoreButtonTemplate());

  const loadMoreButton = filmsList.querySelector('.films-list__show-more');

  const onLoadMoreClick = (evt) => {
    evt.preventDefault();

    movies
      .slice(renderedCardsCount, renderedCardsCount + CARDS_PER_STEP)
      .forEach((movie) => render(filmsListContainer, createCardTemplate(movie)));

    renderedCardsCount +=CARDS_PER_STEP;

    if (renderedCardsCount >= movies.length) {
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener('click', onLoadMoreClick);
}

const compareByRating = (a, b) => {
  const ratingA = a.rating;
  const ratingB = b.rating;
  let comparison = 0;
  if (ratingA > ratingB) {
    comparison = -1;
  } else if (ratingA < ratingB) {
    comparison = 1;
  }
  return comparison;
};

const compareByComments = (a, b) => {
  const commentsA = a.comments.length;
  const commentsB = b.comments.length;
  let comparison = 0;
  if (commentsA > commentsB) {
    comparison = -1;
  } else if (commentsA < commentsB) {
    comparison = 1;
  }
  return comparison;
};

const filmsRatedList = siteMainElement.querySelector('#ratedList');
const filmsCommentedList = siteMainElement.querySelector('#commentedList');

const sortedByRating = [...movies].sort(compareByRating);
const sortedByComments = [...movies].sort(compareByComments);

for (let i = 0; i < EXTRA_CARDS_AMOUNT; i++) {
  render(filmsRatedList.querySelector('.films-list__container'), createCardTemplate(sortedByRating[i]));
  render(filmsCommentedList.querySelector('.films-list__container'), createCardTemplate(sortedByComments[i]));
}

render(footerStat, createFooterStatTemplate(movies.length));
render(siteFooterElement, createPopapTemplate(movies[0]), 'afterend');
