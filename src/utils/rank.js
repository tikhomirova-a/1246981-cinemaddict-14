const Rank = {
  EMPTY: '',
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
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
