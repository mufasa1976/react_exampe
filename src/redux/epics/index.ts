import { PayloadAction } from "@reduxjs/toolkit";
import { ActionsObservable, combineEpics } from "redux-observable";
import { filter, map, mapTo } from "rxjs/operators";
import { ActionTypes, secondAction, thirdAction } from "../actions";

const FirstEpic = (action$: ActionsObservable<PayloadAction<boolean>>) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.FIRST),
    map(action => action.payload),
    map((payload: boolean) => secondAction(0))
  );

const SecondEpic = (action$: ActionsObservable<PayloadAction<number>>) =>
  action$.pipe(
    filter(action => action.type === ActionTypes.SECOND),
    mapTo(thirdAction())
  );

export default combineEpics(FirstEpic, SecondEpic);
