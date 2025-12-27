import Userslice from "@/redux/Userslice";
import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({
    reducer:{
        user: Userslice,
    }
})