import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./api";

//получаем методы, отправляющие запросы к серверу, создаем из них действия, которые будем использовать в срезе и компонентах
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    api.getProducts
);
export const addProduct = createAsyncThunk(
    "products/addProduct",
    api.addProduct
);
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    api.updateProduct
);
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    api.deleteProduct
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                const existingProductIndex = state.list.findIndex(
                    (product) => product._id === id
                );
                if (existingProductIndex !== -1) {
                    state.list[existingProductIndex] = {
                        ...state.list[existingProductIndex],
                        ...data,
                    };
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.list = state.list.filter(
                    (product) => product._id !== action.payload
                );
            });
    },
});

//селекторы для извлечения данных из стора и доступа к данным состояния products в сторе
//первый - возвращает список всех товаров
//второй - возвращает товар по id
export const selectAllProducts = state => state.products.list;
export const selectProductById = (state, productId) => state.products.list.find(product => product._id === productId);

export default productsSlice.reducer;
