export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const Rank = {
  EMPTY: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getUserRank = (movies) => {
  let watchedFilmsAmount = 0;
  movies.forEach((movie) => {
    if (movie.watched) {
      watchedFilmsAmount++;
    }
  });
  return watchedFilmsAmount === 0 ? Rank.EMPTY
    : watchedFilmsAmount <= 10 ? Rank.NOVICE
      : watchedFilmsAmount <= 20 ? Rank.FAN : Rank.MOVIE_BUFF;
};

export const compareByRating = (a, b) => {
  const ratingA = a.rating;
  const ratingB = b.rating;
  return ratingB - ratingA;
};

export const compareByComments = (a, b) => {
  const commentsA = a.commentsId.length;
  const commentsB = b.commentsId.length;
  return commentsB - commentsA;
};
