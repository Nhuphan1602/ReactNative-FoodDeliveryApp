import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk"

const Store = configureStore({reducer:reducers}, applyMiddleware(thunk));

const getToken = () => Store?.getState()?.generalState?.token;

export {Store, getToken};

