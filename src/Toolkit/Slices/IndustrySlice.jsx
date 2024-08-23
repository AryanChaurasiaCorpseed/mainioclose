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


export const getAllSubIndustry=createAsyncThunk('getAllSubIndustry',async()=>{
    const response=await getQuery(`/leadService/api/v1/industryData/getAllSubSubIndustry`)
    return response.data
})

export const createSubIndustry=createAsyncThunk('createSubIndustry',async(data)=>{
    const response=await postQuery(`/leadService/api/v1/industryData/createSubSubIndustry`,data)
    return response.data
})


const IndustrySlice = createSlice({
  name: "industry",
  initialState: {
    allIndustry: [],
    industryLoading: "",
    allSubIndustry:[]
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
  },
})

export default IndustrySlice.reducer
