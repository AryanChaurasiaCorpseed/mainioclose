import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { postQuery } from "../../API/PostQuery"

export const getAllDesiginations = createAsyncThunk(
  "allDesiginations",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/designation/getAllDesignation`
    )
    return response.data
  }
)
export const createDesigination = createAsyncThunk(
  "createDesination",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/designation/createDesignation?name=${data?.name}`
    )
    return response.data
  }
)

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    desiginationList: [],
    loading: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllDesiginations.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllDesiginations.fulfilled, (state, action) => {
      state.loading = "success"
      state.desiginationList = action.payload
    })
    builder.addCase(getAllDesiginations.rejected, (state, action) => {
      state.loading = "rejected"
    })
    builder.addCase(createDesigination.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(createDesigination.fulfilled, (state, action) => {
      state.loading = "success"
      state.desiginationList = [...state.desiginationList, action.payload]
    })
    builder.addCase(createDesigination.rejected, (state, action) => {
      state.loading = "rejected"
    })
  },
})

export default settingSlice.reducer
