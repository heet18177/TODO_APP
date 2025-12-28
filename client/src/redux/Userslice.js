import { FetchCurrUser } from "@/Thunk/FetchCurrUser";
import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
    name: "user",

    initialState: {
        userdata: null,
        loading: true
    },

    reducers: {
        setUserdata: (state, action) => {
            state.userdata = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(FetchCurrUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(FetchCurrUser.fulfilled, (state, action) => {
                state.userdata = action.payload
                state.loading = false;
            })
            .addCase(FetchCurrUser.rejected, (state) => {
                state.loading = false;
            })
    }
})

export const { setUserdata, setLoading } = Userslice.actions;
export default Userslice.reducer