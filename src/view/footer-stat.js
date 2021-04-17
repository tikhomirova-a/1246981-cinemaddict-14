import {createElement} from '../util.js';

const createFooterStatTemplate = (amount) => {
  return `<p>${amount} movies inside</p>`;
};

export default class FooterStat {
  constructor(amount) {
    this._amount = amount;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatTemplate(this._amount);
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
