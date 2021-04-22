import UserRankView from './view/user-rank.js';
import MenuView from './view/menu.js';
import SortingView from './view/sorting.js';
import FilmsSectionView from './view/films-section.js';
import FilmsListView from './view/film-list.js';
import FilmsContainerView from './view/films-container.js';
import CardView from './view/card.js';
import LoadMoreButtonView from './view/load-more-button.js';
import RatedFilmsListView from './view/rated-film-list.js';
import CommentedFilmsListView from './view/commented-film-list.js';
import FooterStatView from './view/footer-stat.js';
import PopupView from './view/popup.js';
import EmptyListView from './view/empty-list.js';
import {generateMovie} from './mock/movie.js';
import {generateComments} from './mock/comments.js';
import {generateFilter} from './mock/filter.js';
import {compareByRating, compareByComments} from './utils/compare.js';
import {getUserRank} from './utils/rank.js';
import {render, remove} from './utils/render.js';

const ALL_CARDS_AMOUNT = 18;
const EXTRA_CARDS_AMOUNT = 2;
const CARDS_PER_STEP = 5;
const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const movies = new Array(ALL_CARDS_AMOUNT).fill().map(generateMovie);
const comments = generateComments();
const filters = generateFilter(movies);

const renderCard = (filmsContainer, movie) => {
  const cardComponent = new CardView(movie);

  const filterComments = (idArr) => {
    const filteredComments = [];
    comments.map((comment) => {
      if (idArr.includes(comment.id)) {
        return filteredComments.push(comment);
      }
    });
    return filteredComments;
  };

  const popupComponent = new PopupView(movie, filterComments(movie.commentsId));

  const showPopup = () => {
    siteBodyElement.appendChild(popupComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');
    popupComponent.setCloseClickHandler(onCloseBtnClick);
    document.addEventListener('keydown', onPopupEsc);
  };

  const hidePopup = () => {
    remove(popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onPopupEsc);
  };

  const onCloseBtnClick = () => {
    hidePopup();
  };

  const onPopupEsc = (evt) => {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      evt.preventDefault();
      hidePopup();
    }
  };

  const onCardClick = () => {
    showPopup();
  };

  cardComponent.setOpenClickHandler(onCardClick);

  render(filmsContainer, cardComponent);
};

const siteBodyElement = document.querySelector('.body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteFooterElement = siteBodyElement.querySelector('.footer');
const footerStat = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserRankView(getUserRank(movies)));
render(siteMainElement, new MenuView(filters));
render(siteMainElement, new SortingView());
render(siteMainElement, new FilmsSectionView());

const filmsSection = siteMainElement.querySelector('.films');

if (movies.length === 0) {
  render(filmsSection, new EmptyListView());
} else {
  render(filmsSection, new FilmsListView());
  render(filmsSection, new RatedFilmsListView());
  render(filmsSection, new CommentedFilmsListView());

  const filmsListElements = siteMainElement.querySelectorAll('.films-list');
  filmsListElements.forEach((filmsListElement) => {
    render(filmsListElement, new FilmsContainerView());
  });

  const filmsContainer = siteMainElement.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(movies.length, CARDS_PER_STEP); i++) {
    renderCard(filmsContainer, movies[i]);
  }

  const filmsList = siteMainElement.querySelector('.films-list');

  if (movies.length > CARDS_PER_STEP) {
    let renderedCardsCount = CARDS_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(filmsList, loadMoreButtonComponent);

    const onLoadMoreClick = () => {
      movies
        .slice(renderedCardsCount, renderedCardsCount + CARDS_PER_STEP)
        .forEach((movie) => renderCard(filmsContainer, movie));

      renderedCardsCount +=CARDS_PER_STEP;

      if (renderedCardsCount >= movies.length) {
        remove(loadMoreButtonComponent);
      }
    };

    loadMoreButtonComponent.setClickHandler(onLoadMoreClick);
  }

  const ratedFilmsList = siteMainElement.querySelector('#ratedList');
  const commentedFilmsList = siteMainElement.querySelector('#commentedList');

  const sortedByRating = [...movies].sort(compareByRating);
  const sortedByComments = [...movies].sort(compareByComments);

  for (let i = 0; i < EXTRA_CARDS_AMOUNT; i++) {
    renderCard(ratedFilmsList.querySelector('.films-list__container'), sortedByRating[i]);
    renderCard(commentedFilmsList.querySelector('.films-list__container'), sortedByComments[i]);
  }
}

render(footerStat, new FooterStatView(movies.length));
