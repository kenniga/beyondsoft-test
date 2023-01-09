import { combineReducers } from 'redux';
import searchReducers from './search';
import selectPlaceReducers from './selectPlace';

const rootReducer = combineReducers({
    search: searchReducers,
    selectedPlace: selectPlaceReducers
});
export default rootReducer 