import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/UserSlice";
import storage from "redux-persist/lib/storage";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";

const persistConfige = {
    key: "root",
    version: 1,
    storage
}

const persistReducer = persistCombineReducers(persistConfige, { user: userSlice.reducer })

export const store = configureStore({
    reducer: persistReducer,

    middleware: (defaultMid) => defaultMid({
        serializableCheck: false
    })
})

export type RootStates = ReturnType<typeof store.getState>