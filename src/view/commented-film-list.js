import AbstractView from './abstract.js';

const createCommentedListTemplate = () => {
  return `<section class="films-list films-list--extra" id="commentedList">
      <h2 class="films-list__title">Most commented</h2>
    </section>`;
};

export default class CommentedFilmsList extends AbstractView {
  getTemplate() {
    return createCommentedListTemplate();
  }
}
