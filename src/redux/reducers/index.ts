import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { ActionTypes } from "../actions";

export interface State {
  value1: string;
  value2: boolean | undefined;
  value3: number | undefined;
}

const initialState: State = {
  value1: "Hello World",
  value2: undefined,
  value3: undefined
};

export const ReducedState = createReducer(initialState, {
  [ActionTypes.FIRST]: (state, action: PayloadAction<boolean>) => ({
    ...state,
    value1: "First Value",
    value2: action.payload
  }),
  [ActionTypes.SECOND]: (state, action: PayloadAction<number>) => ({
    ...state,
    value1: "Second Value",
    value3: action.payload
  }),
  [ActionTypes.THIRD]: state => ({ ...state, value1: "Third Value" })
});
