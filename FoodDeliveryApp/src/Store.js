import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import reducers from "./reducers";
import thunk from "redux-thunk"

const Store = configureStore({reducer:reducers}, applyMiddleware(thunk));

export default Store;