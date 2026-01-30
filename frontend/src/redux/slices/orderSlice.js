import { act } from "react";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

// Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
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

// Async Thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails",
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrders.pending, (state) => {// Handle different states for fetching user orders
            state.loading = true;
            state.error = null;
        }).addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        }).addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        }).addCase(fetchOrderDetails.pending, (state) => {// Handle different states for fetching order details
            state.loading = true;
            state.error = null;
        }).addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload;
        }).addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
    }
});

export default orderSlice.reducer;
