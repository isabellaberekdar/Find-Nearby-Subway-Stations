import {
    FAVORITES_LOADING,
    FAVORITES_LOADED,
    FAVORITES_LOADING_ERROR,
    GET_FAVORITES,
    REMOVE_FAVORITE,
    DELETE_FAVORITES,
    ADD_FAVORITE,
    CREATE_FAVORITES
} from "../actions/types.js";

const initialState = {
    favorites: [],
    id: null,
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload.favorites,
                id: action.payload.id
            };
        case FAVORITES_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case FAVORITES_LOADED:
            return {
                ...state,
                isLoading: false,
                favorites: action.payload.favorites,
                id: action.payload.id
            };

        case FAVORITES_LOADING_ERROR:
            return {
                ...state,
                isLoading: false,
                favorites: [],
                id: null
            };

        case DELETE_FAVORITES:
            return {
                ...state,
                favorites: [],
                id: null
            };

        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: action.payload.lines,
                id: action.payload.id
            };

        case ADD_FAVORITE:
            return {
                ...state,
                favorites: action.payload.lines,
                id: action.payload.id
            };
        case DELETE_FAVORITES:
            return {
                ...state,
                favorites: action.payload.lines,
                id: action.payload.id
            };

        default:
            return state;
    }
}
