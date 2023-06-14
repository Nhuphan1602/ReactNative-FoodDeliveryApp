import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

const Store = configureStore({reducer:reducers});

export default Store;