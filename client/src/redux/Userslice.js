import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
    name: "user",

    initialState: {
        userdata: null
    },

    reducers: {
        setUserdata: (state, action) => {
            state.userdata = action.payload
        },
    }
})

export const { setUserdata } = Userslice.actions;
export default Userslice.reducer