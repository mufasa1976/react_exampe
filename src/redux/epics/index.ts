import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable } from "redux-observable";
import { ajax, AjaxError } from "rxjs/ajax";
import { catchError, filter, map, mapTo, mergeMap, tap } from "rxjs/operators";
import { ActionTypes, secondAction, thirdAction } from "../actions";

export const FirstEpic = (action$: ActionsObservable<PayloadAction<boolean>>) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.FIRST),
    map(action => action.payload),
    mergeMap(payload =>
      ajax({ url: `api/version`, responseType: "text" }).pipe(
        tap(response => console.log(response)),
        tap(response => console.log(response.response)),
        map(() => secondAction(0)),
        catchError((error: AjaxError) => ActionsObservable.of(thirdAction()))
      )
    )
  );

export const SecondEpic = (action$: ActionsObservable<PayloadAction<number>>) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.SECOND),
    mapTo(thirdAction())
  );
