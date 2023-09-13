import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {BASE_URL} from "../../Utils/constant";

export const createUser = createAsyncThunk(
    "users/getUsers",
    async (payload,  thunkAPI) => {
        try{
            const res = await axios.post(`${BASE_URL}/users`, payload);
            return res.data;
        }catch (err){
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    });

export const loginUser = createAsyncThunk(
    "users/loginUsers",
    async (payload,  thunkAPI) => {
        try{
            const res = await axios.post(`${BASE_URL}/auth/login`, payload);
            const login = await axios(`${BASE_URL}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${res.data.access_token}`,
                },
            });
            return login.data;
        }catch (err){
            return thunkAPI.rejectWithValue(err);
        }
    });

const addCurrentUser = (state, { payload }) => {
    state.currentUser = payload;
};

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        cart: [],
        favorite: [],
        isLoading: false,
        formType: "signup",
        showForm: false,
    },
    reducers: {
        addItemToCart: (state, {payload}) => {
            let newCart = [...state.cart];
            const found = state.cart.find(({id}) => id === payload.id);

            if (found) {
                newCart = newCart.map((item) => {
                    return item.id === payload.id
                        ? {...item, quantity: payload.quantity || item.quantity}
                        : item;
                });
            } else newCart.push({...payload, quantity: 1});
            state.cart = newCart;
        },
        removeItemFromCart:(state, {payload}) => {
            state.cart = state.cart.filter(({id}) => id !== payload);
        },
        addItemToFavoriteCart: (state, {payload}) => {
            let newFavoriteCart = [...state.favorite];
            const found = state.favorite.find(({id}) => id === payload.id);

            if (found) {
             newFavoriteCart = newFavoriteCart.map((item) => {
                 return item.id === payload.id
                 ? {...item}
                     : item;
             });
            } else newFavoriteCart.push({...payload, quantity: 1});
            state.favorite = newFavoriteCart;
        },
        removeItemFromFavoriteCart:(state, {payload}) => {
            state.favorite = state.favorite.filter(({id}) => id !== payload);
        },
        toggleForm: (state, {payload}) => {
            state.showForm = payload;
        },
        toggleFormType: (state, {payload}) => {
            state.formType = payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getCategories.pending, (state) => {
        //     state.isLoading = true;
        // });
        builder.addCase(createUser.fulfilled, addCurrentUser);
        builder.addCase(loginUser.fulfilled, addCurrentUser);
        // builder.addCase(getCategories.rejected, (state) => {
        //     state.isLoading = false;
        // });
    },
});

export const {addItemToCart, removeItemFromCart, addItemToFavoriteCart, removeItemFromFavoriteCart, toggleForm, toggleFormType} = userSlice.actions;

export default userSlice.reducer;