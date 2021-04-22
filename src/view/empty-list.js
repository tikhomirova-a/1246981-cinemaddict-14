import AbstractView from './abstract.js';

const createEmptyListTemplate = () => {
  return `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`;
};

export default class emptyList extends AbstractView {
  getTemplate() {
    return createEmptyListTemplate();
  }
}
