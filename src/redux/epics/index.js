import { combineEpics } from 'redux-observable';
import { searchEpic } from './search'
import { selectPlaceEpic } from './selectedPlace'

const rootEpic = combineEpics(searchEpic, selectPlaceEpic);

export default rootEpic