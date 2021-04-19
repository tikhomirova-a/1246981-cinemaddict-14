export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
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
  return watchedFilmsAmount === 0 ? ''
    : watchedFilmsAmount <= 10 ? 'Novice'
      : watchedFilmsAmount <= 20 ? 'Fan' : 'Movie Buff';
};
