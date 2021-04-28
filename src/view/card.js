import AbstractView from './abstract.js';

const createCardTemplate = (movie, filteredComments) => {
  const {title, rating, releaseDate, runtime, genres, poster, description, favorite, watchlist, watched} = movie;
  const comments = filteredComments;
  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate.getFullYear()}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres.map((genre) => genre).join(', ')}</span>
          </p>
          <img src="./${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}</a>
          <div class="film-card__controls">
            <button  class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? 'film-card__controls-item--active' : ''}"
            type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? 'film-card__controls-item--active' : ''}"
            type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active' : ''}"
            type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class Card extends AbstractView {
  constructor(movie, comments) {
    super();
    this._movie = movie;
    this._comments = comments;
    this._openClickHandler = this._openClickHandler.bind(this);
  }

  getTemplate() {
    return createCardTemplate(this._movie, this._comments);
  }

  _openClickHandler(evt) {
    if (evt.target.classList.contains('film-card__poster') || evt.target.classList.contains('film-card__title')
      || evt.target.classList.contains('film-card__comments')) {
      evt.preventDefault();
      this._callback.openClick();
    }
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().addEventListener('click', this._openClickHandler);
  }
}
