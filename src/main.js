import UserRankView from './view/user-rank.js';
import MenuView from './view/menu.js';
import FooterStatView from './view/footer-stat.js';
import {generateMovie} from './mock/movie.js';
import {generateComments} from './mock/comments.js';
import {generateFilter} from './mock/filter.js';
import {getUserRank} from './utils/rank.js';
import {render} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';

const ALL_CARDS_AMOUNT = 18;

const movies = new Array(ALL_CARDS_AMOUNT).fill().map(generateMovie);
const comments = generateComments();
const filters = generateFilter(movies);

const siteBodyElement = document.querySelector('.body');
const siteHeaderElement = siteBodyElement.querySelector('.header');
const siteMainElement = siteBodyElement.querySelector('.main');
const siteFooterElement = siteBodyElement.querySelector('.footer');
const footerStat = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserRankView(getUserRank(movies)));
render(siteMainElement, new MenuView(filters));

const filmListPresenter = new FilmListPresenter(siteMainElement);
filmListPresenter.init(movies, comments);

render(footerStat, new FooterStatView(movies.length));
