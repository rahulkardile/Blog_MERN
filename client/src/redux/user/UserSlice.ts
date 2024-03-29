import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { User } from "../types/ReduxType"

export type initialState = {
    currentUser: User | null,
    loading: boolean
} 

const initialState: initialState = {
    currentUser: null,
    loading: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.currentUser =     action.payload,
            state.loading = false;
        },
        removerUser: (state) => {
            state.currentUser = null,
            state.loading = false
        }
    }
})

export const { addUser, removerUser } = userSlice.actions