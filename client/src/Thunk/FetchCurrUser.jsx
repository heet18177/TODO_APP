import { SERVER_URL } from "@/main";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const FetchCurrUser = createAsyncThunk("", async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/task/getUser`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.log(err.message);
  }
});
