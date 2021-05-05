import SortingView from '../view/sorting.js';
import FilmsSectionView from '../view/films-section.js';
import FilmsListView from '../view/film-list.js';
import FilmsContainerView from '../view/films-container.js';
import CardPresenter from './card.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import RatedFilmsListView from '../view/rated-film-list.js';
import CommentedFilmsListView from '../view/commented-film-list.js';
import EmptyListView from '../view/empty-list.js';
import {render, remove} from '../utils/render.js';
import {compareByComments, compareByRating, compareByDate} from '../utils/compare.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../utils/const.js';

const CARDS_PER_STEP = 5;
const EXTRA_CARDS_AMOUNT = 2;

export default class FilmList {
  constructor(mainContainer) {
    this._mainContainer = mainContainer;
    this._renderedCardsCount = CARDS_PER_STEP;
    this._cardPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._filteredComments = [];

    this._sortingComponent = new SortingView();
    this._filmsSectionComponent = new FilmsSectionView();
    this._filmsListComponent = new FilmsListView();
    this._ratedFilmsListComponent = new RatedFilmsListView();
    this._commentedFilmsListComponent = new CommentedFilmsListView();
    this._emptyFilmsListComponent = new EmptyListView();
    this._allFilmsContainerComponent = new FilmsContainerView();
    this._ratedFilmsContainerComponent = new FilmsContainerView();
    this._commentedFilmsContainerComponent = new FilmsContainerView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movies, comments) {
    this._movies = movies.slice();
    this._comments = comments.slice();
    this._sourcedMovies = movies.slice();
    this._renderSorting();
    this._renderFilmsSection();

    this._renderFilmList();
  }

  _renderSorting() {
    render(this._mainContainer, this._sortingComponent);
    this._sortingComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilmsSection() {
    render(this._mainContainer, this._filmsSectionComponent);
  }

  _renderAllFilmsList() {
    render(this._filmsSectionComponent, this._filmsListComponent);
    render(this._filmsListComponent, this._allFilmsContainerComponent);
  }

  _renderCommentedList() {
    render(this._filmsSectionComponent, this._commentedFilmsListComponent);
    render(this._commentedFilmsListComponent, this._commentedFilmsContainerComponent);
  }

  _renderRatedList() {
    render(this._filmsSectionComponent, this._ratedFilmsListComponent);
    render(this._ratedFilmsListComponent, this._ratedFilmsContainerComponent);
  }

  _renderEmptyList() {
    render(this._filmsSectionComponent, this._emptyFilmsListComponent);
  }

  _filterComments(comments, idArr) {
    const filteredComments = [];
    comments.map((comment) => {
      if (idArr.includes(comment.id)) {
        return filteredComments.push(comment);
      }
    });
    return filteredComments;
  }

  _renderCard(container, movie) {
    const cardPresenter = new CardPresenter(container, this._handleCardChange, this._handleModeChange);
    const filteredComments = this._filterComments(this._comments, movie.commentsId);
    this._filteredComments = filteredComments;
    cardPresenter.init(movie, filteredComments);
    this._cardPresenter[movie.id] = cardPresenter;
  }

  _handleModeChange() {
    Object.values(this._cardPresenter).forEach((presenter) => presenter.resetView());
  }

  _handleCardChange(updatedCard) {
    this._movies = updateItem(this._movies, updatedCard);
    this._sourcedMovies = updateItem(this._sourcedMovies, updatedCard);
    this._cardPresenter[updatedCard.id].init(updatedCard, this._filteredComments);
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._movies.sort(compareByDate);
        break;
      case SortType.RATING:
        this._movies.sort(compareByRating);
        break;
      default:
        this._movies = this._sourcedMovies;
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortMovies(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _handleLoadMoreButtonClick() {
    this._movies
      .slice(this._renderedCardsCount, this._renderedCardsCount + CARDS_PER_STEP)
      .forEach((movie) => this._renderCard(this._allFilmsContainerComponent, movie));

    this._renderedCardsCount += CARDS_PER_STEP;

    if (this._renderedCardsCount >= this._movies.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList() {
    Object.values(this._cardPresenter).forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};
    this._renderedCardsCount = CARDS_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmList() {
    if (this._movies.length === 0) {
      this._renderEmptyList();
      return;
    }
    this._renderAllFilmsList();
    this._renderRatedList();
    this._renderCommentedList();

    for (let i = 0; i < Math.min(this._movies.length, CARDS_PER_STEP); i++) {
      this._renderCard(this._allFilmsContainerComponent, this._movies[i]);
    }

    if (this._movies.length > CARDS_PER_STEP) {
      this._renderLoadMoreButton();
    }

    const sortedByRating = [...this._movies].sort(compareByRating);
    const sortedByComments = [...this._movies].sort(compareByComments);

    for (let i = 0; i < EXTRA_CARDS_AMOUNT; i++) {
      this._renderCard(this._ratedFilmsContainerComponent, sortedByRating[i]);
      this._renderCard(this._commentedFilmsContainerComponent, sortedByComments[i]);
    }
  }
}
