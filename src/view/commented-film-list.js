import {createElement} from '../util.js';

const createCommentedListTemplate = () => {
  return `<section class="films-list films-list--extra" id="commentedList">
      <h2 class="films-list__title">Most commented</h2>
    </section>`;
};

export default class CommentedFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentedListTemplate();
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
