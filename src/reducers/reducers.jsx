import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USERDATA, ADD_FAVORITE, REMOVE_FAVORITE } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function userData(state = {}, action) {
    switch (action.type) {
        case SET_USERDATA:
            return action.value;
        default:
            return state;
    }
}

function addFavorite(state = [], action) {
    switch (action.type) {
        case ADD_FAVORITE:
            return [...state, action]
        default:
            return state
    }
}

function removeFavorite(state = [], action) {
    switch (action.type) {
        case REMOVE_FAVORITE:
            return state.filter((item) => action !== item)
        default:
            return state
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    userData,
    addFavorite,
    removeFavorite
});

export default moviesApp;