import {createElement} from '../util.js';

const createUserRankTemplate = (amount) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${amount === 0 ? '' : amount <= 10 ? 'Novice' : amount <= 20 ? 'Fan' : 'Movie Buff'}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserRank {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createUserRankTemplate(this._amount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
