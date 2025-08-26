import { configureStore } from "@reduxjs/toolkit";
import emp from "./slices/empSlice.js";
import task from "./slices/taskSlice.js";
import admin from "./slices/adminSlice.js";

const store = configureStore({
    reducer:{emp,task,admin}
})

export default store;