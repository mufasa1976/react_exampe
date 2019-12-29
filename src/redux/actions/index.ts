import { createAction } from "@reduxjs/toolkit";

export enum ActionTypes {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  OPEN_DIALOG = "OPEN_DIALOG"
}

export const firstAction = createAction<boolean>(ActionTypes.FIRST);
export const secondAction = createAction<number>(ActionTypes.SECOND);
export const thirdAction = createAction<void>(ActionTypes.THIRD);
export const openDialogAction = createAction<boolean>(ActionTypes.OPEN_DIALOG);
