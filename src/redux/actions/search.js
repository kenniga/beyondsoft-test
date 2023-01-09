import { SEARCH, SEARCH_SUCCESS, SEARCH_ERROR } from './types';

export const search = query => {
    return ({
        type: SEARCH,
        payload: query
    })
};

export const searchSuccess = results => ({
    type: SEARCH_SUCCESS,
    payload: results
});

export const searchError = error => ({
    type: SEARCH_ERROR,
    payload: error
});