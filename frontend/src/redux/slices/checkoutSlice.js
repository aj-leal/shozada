import { build } from "vite";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

// Async Thunk to create a checkout session
export const createCheckout = createAsyncThunk("checkout/createCheckout",
    async (checkoutdata, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                checkoutdata,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Slice to manage checkout state

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCheckout.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(createCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }).addCase(createCheckout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    },
});

export default checkoutSlice.reducer;
