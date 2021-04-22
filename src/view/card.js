import AbstractView from './abstract.js';

const createCardTemplate = (movie) => {
  const {title, rating, releaseDate, runtime, genres, poster, description, commentsId, favorite, watchlist, watched} = movie;
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
          <a class="film-card__comments">${commentsId.length} ${commentsId.length > 1 ? 'comments' : 'comment'}</a>
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
  constructor(movie) {
    super();
    this._movie = movie;
  }

  getTemplate() {
    return createCardTemplate(this._movie);
  }
}
