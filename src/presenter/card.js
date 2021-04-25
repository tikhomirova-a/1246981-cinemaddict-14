import CardView from '../view/card.js';
import PopupView from '../view/popup.js';
import {render, remove} from '../utils/render.js';

const siteBodyElement = document.querySelector('.body');
const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

export default class Card {
  constructor(cardContainer) {
    this._cardContainer = cardContainer;

    this._cardComponent = null;
    this._popupComponent = null;

    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handlePopupEsc = this._handlePopupEsc.bind(this);
  }

  init(movie, comments) {
    this._movie = movie;
    this._comments = comments.slice();
    this._cardComponent = new CardView(this._movie);
    this._popupComponent = new PopupView(this._movie, this._filterComments(this._comments, this._movie.commentsId));
    this._cardComponent.setOpenClickHandler(this._handleCardClick);
    render(this._cardContainer, this._cardComponent);
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

  _showPopup() {
    siteBodyElement.appendChild(this._popupComponent.getElement());
    siteBodyElement.classList.add('hide-overflow');
    this._popupComponent.setCloseClickHandler(this._handleCloseBtnClick);
    document.addEventListener('keydown', this._handlePopupEsc);
  }

  _hidePopup() {
    remove(this._popupComponent);
    siteBodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._handlePopupEsc);
  }

  _handleCloseBtnClick() {
    this._hidePopup();
  }

  _handlePopupEsc(evt) {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      evt.preventDefault();
      this._hidePopup();
    }
  }

  _handleCardClick() {
    this._showPopup();
  }
}
