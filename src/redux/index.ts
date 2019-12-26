import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import * as Epics from "./epics";
import * as Reducers from "./reducers";

const epicMiddleware = createEpicMiddleware();

const configureAppStore = (): Store => {
  const store = configureStore({
    reducer: combineReducers({State: Reducers.ReducedState}),
    middleware: [epicMiddleware],
    devTools: {
      name: "My first React App"
    }
  });
  epicMiddleware.run(combineEpics(Epics.FirstEpic, Epics.SecondEpic));
  return store;
};

export default configureAppStore;
