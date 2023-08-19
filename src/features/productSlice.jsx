import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { API } from "../config/api";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  const response = await API.get("/products");
  return response.data.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async ({formData, config}) => {
  try {
    const response = await API.post("/product", formData, config);
    alert("Add product success")
    return response.data.data;
  } catch(error) {
    alert("Image format must be JPG and PNG, maximum 100KB and product name must be unique.")
  }
});
export const updateProduct = createAsyncThunk("products/updateProduct", async ({id, formData, config}) => {
  try {
    const response = await API.patch(`/product/${id}`, formData, config);
    alert("Update product success")
    return response.data.data;
  } catch(error) {
    alert("Image format must be JPG and PNG, maximum 100KB, product name must be unique and image must be filled in.")
  }
});
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await API.delete(`/product/${id}`);
  return id;
});

const productEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
        productEntity.setAll(state, action.payload)
    },
    [addProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload)
    }, 
    [deleteProduct.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload)
    }, 
    [updateProduct.fulfilled]: (state, action) => {
      productEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
    }
  }
});

export const productSelectors = productEntity.getSelectors(state => state.product);
export default productSlice.reducer;
