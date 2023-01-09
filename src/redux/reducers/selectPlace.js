import { SELECT_PLACE, SELECT_PLACE_SUCCESS, SELECT_PLACE_ERROR } from '../actions/types';

const initialState = {
    currentSelectedPlace: null,
    previouselySelectedPlace: [],
    error: null
}

function selectPlaceReducers(state = initialState, action) {
    switch (action.type) {
        case SELECT_PLACE:
            return {
                ...state,
            }
        case SELECT_PLACE_SUCCESS:
            return {
                ...state,
                currentSelectedPlace: action.selectedResult,
                previouselySelectedPlace: [
                    {
                        ...action.payload,
                        isPreviouslySelected: true
                    },
                    ...state.previouselySelectedPlace,
                ]
            }
        case SELECT_PLACE_ERROR:
            return {
                ...state,
                error: {
                    selectedPlace: action.selectedPlace,
                    error: action.error
                }
            };
        default:
            return state;
    }
}
export default selectPlaceReducers