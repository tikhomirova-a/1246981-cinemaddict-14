import {createElement} from '../util.js';

const createRatedListTemplate = () => {
  return `<section class="films-list films-list--extra" id="ratedList">
      <h2 class="films-list__title">Top rated</h2>
    </section>`;
};

export default class RatedFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createRatedListTemplate();
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
