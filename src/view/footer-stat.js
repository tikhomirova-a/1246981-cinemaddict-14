import AbstractView from './abstract.js';

const createFooterStatTemplate = (amount) => {
  return `<p>${amount} movies inside</p>`;
};

export default class FooterStat extends AbstractView {
  constructor(amount) {
    super();
    this._amount = amount;
  }

  getTemplate() {
    return createFooterStatTemplate(this._amount);
  }
}
