import { configureStore, Store } from "@reduxjs/toolkit";
import { createEpicMiddleware } from "redux-observable";
import CombinedEpics from "./epics";
import RootRecuder from "./reducers";

const epicMiddleware = createEpicMiddleware();

const configureAppStore = (): Store => {
  const store = configureStore({
    reducer: RootRecuder,
    middleware: [epicMiddleware],
    devTools: {
      name: "My first React App"
    }
  });
  epicMiddleware.run(CombinedEpics);
  return store;
};

export default configureAppStore;
