import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { postQuery } from "../../API/PostQuery"

export const getAllProductData = createAsyncThunk(
  "getAllProductData",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/product/getAllProducts`
    )
    return response.data
  }
)

export const getSingleProductByProductId = createAsyncThunk(
  "getSingleProductByProductId",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/product/getProduct?id=${id}`
    )
    return response.data
  }
)

export const getAllCategories = createAsyncThunk(
  "getAllCategories",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/category/getAllCategories`
    )
    return response.data
  }
)

export const addDocumentProduct = createAsyncThunk(
  "addDocumentProduct",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/product/addDocumentsInProduct`,
      data
    )
    return response.categoryData
  }
)

export const addMilestoneForProduct=createAsyncThunk('addMilestoneForProduct',async(data)=>{
    const response=await postQuery(`/leadService/api/v1/product/addStageInProduct`,data)
    return response.data
})

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    loading: "",
    productData: [],
    categoryData: [],
    singleProductDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductData.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllProductData.fulfilled, (state, action) => {
      state.loading = "success"
      state.productData = action.payload
    })
    builder.addCase(getAllProductData.rejected, (state, action) => {
      state.loading = "rejected"
      state.productData = []
    })

    builder.addCase(getAllCategories.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = "success"
      state.categoryData = action.payload
    })
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = "rejected"
      state.categoryData = []
    })

    builder.addCase(getSingleProductByProductId.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getSingleProductByProductId.fulfilled, (state, action) => {
      state.loading = "success"
      state.singleProductDetail = action.payload
    })
    builder.addCase(getSingleProductByProductId.rejected, (state, action) => {
      state.loading = "rejected"
      state.singleProductDetail = {}
    })
  },
})

export default ProductSlice.reducer