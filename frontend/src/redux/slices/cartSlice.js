import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
}

// helper function to store cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Sync the locally stored cart with the cart from DB
export const syncCart = createAsyncThunk("cart/syncCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const localCart = loadCartFromStorage();

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                params: { userId, guestId, }
            });

            const dbCart = response.data;

            if (!localCart) {
                saveCartToStorage(dbCart);
                return dbCart;
            }

            // Get UpdatedAt timestamps to be compared
            const localCartUpdatedAt = new Date(localCart.updatedAt).getTime();
            const dbCartUpdatedAt = new Date(dbCart.updatedAt).getTime();

            // Local cart is up to date
            if (localCartUpdatedAt >= dbCartUpdatedAt) return localCart;
            // Local Cart is outdated
            localStorage.removeItem("cart");
            saveCartToStorage(dbCart);
            return dbCart;
        } catch (error) {
            // Case where cart is non existent in the database
            if (error.response?.status === 404) {
                localStorage.removeItem("cart");
                return { products: [] };
            }

            return rejectWithValue(error.response?.data || "Cart sync failed.");
        }
    }
);

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                params: { userId, guestId },
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk("cart/addToCart",
    async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                productId,
                quantity,
                size,
                color,
                userId,
                guestId,
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity",
    async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                productId,
                quantity,
                guestId,
                userId,
                size,
                color,
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Remove an item in the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart",
    async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    data: { productId, guestId, userId, size, color, }
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Merge geust cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart",
    async ({ guestId, user }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                { guestId, user },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => { // ==== Fetch cart slice
            state.loading = true;
            state.error = null;
        }).addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        }).addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart.";
        }).addCase(addToCart.pending, (state) => {// === Add to cart slice
            state.loading = true;
            state.error = null;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        }).addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart.";
        }).addCase(updateCartItemQuantity.pending, (state) => {// === Update cart item quantity slice
            state.loading = true;
            state.error = null;
        }).addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        }).addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item quantity.";
        }).addCase(removeFromCart.pending, (state) => {// === Removing item from cart slice
            state.loading = true;
            state.error = null;
        }).addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        }).addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item.";
        }).addCase(mergeCart.pending, (state) => {// === Merge guest cart to user cart - slice
            state.loading = true;
            state.error = null;
        }).addCase(mergeCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        }).addCase(mergeCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart.";
        }).addCase(syncCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(syncCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload || { products: [] };
        }).addCase(syncCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
