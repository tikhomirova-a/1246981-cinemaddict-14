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
