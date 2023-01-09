/*global google*/
import { ofType } from 'redux-observable';
import { Observable, timer, of } from 'rxjs';
import { map, catchError, switchMap, debounce } from 'rxjs/operators';
import { SEARCH, SEARCH_SUCCESS, SEARCH_ERROR } from '../actions/types';


const searchResults$ = (input: string) => {
    const autocompleteService = new google.maps.places.AutocompleteService();
    return new Observable(observer => {
        autocompleteService.getPlacePredictions({ input }, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                observer.next(predictions);
            } else {
                observer.error(status);
            }
            observer.complete();
        });
    });
};


export const searchEpic = action$ =>
    action$.pipe(
        ofType(SEARCH),
        debounce(() => timer(1000)),
        switchMap(action => searchResults$(action.payload).pipe(
            map(response => {
                return ({
                    type: SEARCH_SUCCESS,
                    results: response,
                    query: action.payload
                })
            }),
            catchError(error => of({ type: SEARCH_ERROR, query: action.payload, error }))
        ))
    );
