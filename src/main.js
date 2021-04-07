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
import {createPopapTemplate} from './view/popap.js';
import {createCommentTemplate} from './view/comment.js';
import {generateMovie} from './mock/movie.js';
import {generateComments} from './mock/comments.js';

const ALL_CARDS_AMOUNT = 18;
const EXTRA_CARDS_AMOUNT = 2;

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const movies = new Array(ALL_CARDS_AMOUNT).fill().map(generateMovie);
const comments = generateComments();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const footerStat = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, createUserRankTemplate());
render(siteMainElement, createMenuTemplate());
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

for (let i = 0; i < ALL_CARDS_AMOUNT; i++) {
  render(filmsListContainer, createCardTemplate(movies[i]));
}

const filmsList = siteMainElement.querySelector('.films-list');
render(filmsList, createLoadMoreButtonTemplate());

const filmsListExtraElements = siteMainElement.querySelectorAll('.films-list--extra');
filmsListExtraElements.forEach((list) => {
  for (let i = 0; i < EXTRA_CARDS_AMOUNT; i++) {
    render(list.querySelector('.films-list__container'), createCardTemplate(movies[i]));
  }
});

render(footerStat, createFooterStatTemplate());
render(siteFooterElement, createPopapTemplate(movies[0]), 'afterend');

const popap = document.querySelector('.film-details');
const commentList = popap.querySelector('.film-details__comments-list');

// for (const comment of comments) {
//   render(commentList, createCommentTemplate(comment));
// }
console.log(movies[0]);
