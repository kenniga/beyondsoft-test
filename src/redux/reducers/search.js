import { SEARCH, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/types';

const initialState = {
    searchHistory: [],
};

function searchReducers(state = initialState, action) {
    switch (action.type) {
        case SEARCH:
            return {
                ...state,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchHistory: [{
                    searchQuery: action.query,
                    searchResults: action.results
                }, ...state.searchHistory]
            };
        case SEARCH_ERROR:
            return {
                ...state,
                searchHistory: [...state.searchHistory, {
                    searchQuery: action.query,
                    searchError: action.error
                }]
            };
        default:
            return state;
    }
}
export default searchReducers