import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQuery } from "../../API/PostQuery"
import { getQuery } from "../../API/GetQuery"

export const createIndustry = createAsyncThunk(
  "createIndustry",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/industryData/createIndustryData?name=${data?.name}`
    )
    return response.data
  }
)

export const getAllIndustry = createAsyncThunk("getAllIndustry", async () => {
  const response = await getQuery(
    `/leadService/api/v1/industryData/getAllIndustryData`
  )
  return response.data
})

export const getAllSubsubIndustry = createAsyncThunk(
  "getAllSubsubIndustry",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/industryData/getAllSubSubIndustry`
    )
    return response.data
  }
)

export const createSubsubIndustry = createAsyncThunk(
  "createSubsubIndustry",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/industryData/createSubSubIndustry`,
      data
    )
    return response.data
  }
)

export const createSubIndustry = createAsyncThunk(
  "createSubIndustry",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/industryData/createSubIndustry`,
      data
    )
    return response.data
  }
)

export const getAllSubIndustry = createAsyncThunk(
  "getAllSubIndustry",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/industryData/getAllSubIndustry`
    )
    return response.data
  }
)

export const getAllMainIndustry = createAsyncThunk("getAllMainIndustry", async () => {
  const response = await getQuery(`/leadService/api/v1/industryData/getAllIndustry`)
  return response.data
})

export const createMainIndustry = createAsyncThunk(
  "createMainIndustry",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/industryData/createIndustry`,
      data
    )
    return response.data
  }
)

const IndustrySlice = createSlice({
  name: "industry",
  initialState: {
    allIndustry: [],
    industryLoading: "",
    allSubIndustry: [],
    allSubsubIndustry: [],
    allMainIndustry:[]
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIndustry.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllIndustry.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allIndustry = action.payload
    })
    builder.addCase(getAllIndustry.rejected, (state, action) => {
      state.industryLoading = "rejected"
    })

    builder.addCase(getAllSubsubIndustry.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllSubsubIndustry.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allSubsubIndustry = action.payload
    })                                                                                                                                                                                  
    builder.addCase(getAllSubsubIndustry.rejected, (state, action) => {
      state.industryLoading = "rejected"
    })

    builder.addCase(getAllSubIndustry.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllSubIndustry.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allSubIndustry = action.payload
    })
    builder.addCase(getAllSubIndustry.rejected, (state, action) => {
      state.industryLoading = "rejected"
    })

    builder.addCase(getAllMainIndustry.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllMainIndustry.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allMainIndustry = action.payload
    })
    builder.addCase(getAllMainIndustry.rejected, (state, action) => {
      state.industryLoading = "rejected"
    })
  },
})

export default IndustrySlice.reducer
