const movieToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.watchlist).length,
  history: (movies) => movies.filter((movie) => movie.watched).length,
  favorite: (movies) => movies.filter((movie) => movie.favorite).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
