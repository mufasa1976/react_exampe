import { createAction } from "@reduxjs/toolkit";

export enum ActionTypes {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  SHOW_DIALOG = "SHOW DIALOG"
}

export const firstAction = createAction<boolean>(ActionTypes.FIRST);
export const secondAction = createAction<number>(ActionTypes.SECOND);
export const thirdAction = createAction<void>(ActionTypes.THIRD);
export const showDialogAction = createAction<boolean>(ActionTypes.SHOW_DIALOG);
