/*global google*/
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { SELECT_PLACE, SELECT_PLACE_SUCCESS, SELECT_PLACE_ERROR } from '../actions/types';

const selectPlace$ = (action) => {
    const geocoder = new google.maps.Geocoder();
    return new Observable(observer => {
        geocoder.geocode({ placeId: action.place_id }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                observer.next(results[0]);
            } else {
                observer.error(status);
            }
            observer.complete();
        });
    });
};


export const selectPlaceEpic = action$ =>
    action$.pipe(
        ofType(SELECT_PLACE),
        switchMap(action => selectPlace$(action.payload).pipe(
            map(response => {
                return ({
                    type: SELECT_PLACE_SUCCESS,
                    selectedResult: response,
                    payload: action.payload
                })
            }),
            catchError(error => of({ type: SELECT_PLACE_ERROR, selectedPlace: action.payload, error }))
        ))
    );