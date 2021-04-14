const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${name.charAt(0).toUpperCase() + name.slice(1)} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const createMenuTemplate = (filters) => {
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filters.map((filter) => createFilterItemTemplate(filter)).join('')}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
