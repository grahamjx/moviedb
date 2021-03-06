import axios from 'axios';
import loki from '../lokiDB/index';
import { GET_MOVIES, GET_MOVIE, GET_FAVORITES, GET_FAVORITE,
         CHECK_FAVORITE, ADD_FAVORITE, REMOVE_FAVORITE} from '../constants/ActionTypes';

const ROOT_URL = 'https://www.omdbapi.com/';
const SEARCH_TOKEN = '?s=';
const ID_TOKEN = '?i=';
const TYPE_URL = '&y=&plot=short&r=json';

export function searchMovies(term) {
  const request = axios.get(`${ROOT_URL}${SEARCH_TOKEN}${term}`);

  return {
    type: GET_MOVIES,
    payload: request
  }
}

export function getMovie(movie) {
  const request = axios.get(`${ROOT_URL}${ID_TOKEN}${movie.imdbID}${TYPE_URL}`);

  return {
    type: GET_MOVIE,
    payload: request
  }
}

export function getFavorites() {
  const request = new Promise( resolve => {
    setTimeout(() => resolve(loki.getCollection('favorites').data), 100);
  });

  return {
    type: GET_FAVORITES,
    payload: request
  }
}

export function getFavorite(movie) {
  return {
    type: GET_FAVORITE,
    payload: movie
  }
}

export function getInit() {
  const request = new Promise( resolve => {
    setTimeout(() => resolve(loki.getCollection('favorites').data[0]), 100);
  });

  return {
    type: GET_FAVORITE,
    payload: request
  }
}

export function addFavorite(movie) {
  loki.getCollection('favorites').insert(movie);

  return {
    type: ADD_FAVORITE,
    payload: movie
  }
}

export function removeFavorite(movie) {
  const request = loki.getCollection('favorites').findAndRemove(movie);

  return {
    type: REMOVE_FAVORITE,
    payload: request
  }
}

export function checkFavorite(movie) {
  const request = loki.getCollection('favorites').findOne(movie)

  return {
    type: CHECK_FAVORITE,
    payload: request
  }
}

export function diskCacheResults(movies) {
  const request = movies.map((movie) => {
    return axios.get(`${ROOT_URL}${ID_TOKEN}${movie.imdbID}${TYPE_URL}`)
  });

  return {
    type: GET_MOVIE,
    payload: request[0]
  }
}
