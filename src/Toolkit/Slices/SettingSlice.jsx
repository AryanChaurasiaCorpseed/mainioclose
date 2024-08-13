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
      `/leadService/api/v1/designation/createDesignation?name=${data?.name}&weight=${data?.weight}`
    )
    return response.data
  }
)

export const getAllDepartment = createAsyncThunk(
  "getAllDepartment",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/designation/getAllDepartment`
    )
    return response.data
  }
)
export const createDepartment = createAsyncThunk(
  "createDepartment",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/designation/createDepartment?name=${data?.name}`
    )
    return response.data
  }
)

export const createDesiginationByDepartmentId=createAsyncThunk('createDesiginationByDepartmentId',async(data)=>{
  const response=await postQuery(`/leadService/api/v1/designation/createDepartmentInDesignation`,data)
  return response.data
})

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    desiginationList: [],
    loading: "",
    allDepartment: [],
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
    builder.addCase(getAllDepartment.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllDepartment.fulfilled, (state, action) => {
      state.loading = "success"
      state.allDepartment = action.payload
    })
    builder.addCase(getAllDepartment.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(createDepartment.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.loading = "success"
      state.allDepartment = [...state.allDepartment, action.payload]
    })
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.loading = "rejected"
    })
  },
})

export default settingSlice.reducer
