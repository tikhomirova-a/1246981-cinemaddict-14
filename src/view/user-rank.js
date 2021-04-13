export const createUserRankTemplate = (amount) => {
  if (amount === 0) {
    return;
  }
  return `<section class="header__profile profile">
    <p class="profile__rating">${amount <= 10 ? 'Novice' : amount <= 20 ? 'Fan' : 'Movie Buff'}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
