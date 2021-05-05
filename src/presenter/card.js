import CardView from '../view/card.js';
import PopupView from '../view/popup.js';
import {render, remove, replace} from '../utils/render.js';

const siteBodyElement = document.querySelector('.body');
const Key = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};
const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class Card {
  constructor(cardContainer, changeData, changeMode) {
    this._cardContainer = cardContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._cardComponent = null;
    this._popupComponent = null;
    this._movie = null;
    this._comments = null;
    this._mode = Mode.DEFAULT;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleHistoryClick = this._handleHistoryClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handlePopupEsc = this._handlePopupEsc.bind(this);
  }

  init(movie, comments) {
    this._movie = movie;
    this._comments = comments;

    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponent;

    this._cardComponent = new CardView(this._movie, this._comments);
    this._popupComponent = new PopupView(this._movie, this._comments);
    this._cardComponent.setOpenClickHandler(this._handleCardClick);
    this._cardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._cardComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setHistoryClickHandler(this._handleHistoryClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this._cardContainer, this._cardComponent);
      return;
    }

    if (this._cardContainer.getElement().contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._cardContainer.getElement().contains(prevPopupComponent.getElement())) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._cardComponent);
    remove(this._popupComponent);
  }

  _showPopup() {
    siteBodyElement.appendChild(this._popupComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');
    this._popupComponent.setCloseClickHandler(this._handleCloseBtnClick);
    document.addEventListener('keydown', this._handlePopupEsc);
    this._mode = Mode.POPUP;
  }

  _hidePopup() {
    remove(this._popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handlePopupEsc);
    this._mode = Mode.DEFAULT;
  }

  _handleCloseBtnClick() {
    this._hidePopup();
  }

  _handlePopupEsc(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this._hidePopup();
    }
  }

  _handleCardClick() {
    this._showPopup();
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          watchlist: !this._movie.watchlist,
        },
      ),
    );
    if (this._mode === Mode.POPUP) {
      this._showPopup();
    }
  }

  _handleHistoryClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          watched: !this._movie.watched,
        },
      ),
    );
    if (this._mode === Mode.POPUP) {
      this._showPopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._movie,
        {
          favorite: !this._movie.favorite,
        },
      ),
    );
    if (this._mode === Mode.POPUP) {
      this._showPopup();
    }
  }
}
