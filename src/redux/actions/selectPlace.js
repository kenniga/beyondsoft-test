import { SELECT_PLACE, SELECT_PLACE_SUCCESS, SELECT_PLACE_ERROR } from './types';

export const selectPlace = payload => {
    return ({
        type: SELECT_PLACE,
        payload
    })
};

export const selectPlaceSuccess = results => ({
    type: SELECT_PLACE_SUCCESS,
    payload: results
});

export const selectPlaceError = error => ({
    type: SELECT_PLACE_ERROR,
    payload: error
});