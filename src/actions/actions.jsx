export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USERDATA = 'SET_USERDATA';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setUserData(value) {
    return { type: SET_USERDATA, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

export function addFavorite(value) {
    return { type: ADD_FAVORITE, value }
}

export function removeFavorite(value) {
    return { type: REMOVE_FAVORITE, value }
}