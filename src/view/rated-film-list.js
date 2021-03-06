import AbstractView from './abstract.js';

const createRatedListTemplate = () => {
  return `<section class="films-list films-list--extra" id="ratedList">
      <h2 class="films-list__title">Top rated</h2>
    </section>`;
};

export default class RatedFilmsList extends AbstractView {
  getTemplate() {
    return createRatedListTemplate();
  }
}
