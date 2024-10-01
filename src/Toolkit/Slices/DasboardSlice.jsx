import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQuery } from "../../API/PostQuery"
import { getQuery } from "../../API/GetQuery"
import { getQueryWithBody } from "../../API/GetQueryWithBody"

export const projectGraphData = createAsyncThunk(
  "projectGraph",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/salesDashboard/getAllProjectGraph`,
      data
    )
    return response.data
  }
)

export const projectGraphAmount = createAsyncThunk(
  "projectGraphAmount",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/salesDashboard/getAllProjectGraphAmount`,
      data
    )
    return response.data
  }
)

export const getAllCompanyAmountGrapgh = createAsyncThunk(
  "getAllCompanyAmountGrapgh",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/salesDashboard/getAllCompanyAmountGraph`,
      data
    )
    return response.data
  }
)



const DashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    projectListData: [],
    loading: "",
    projectAmountList: [],
    companyAmountList: [],
  },
  extraReducers: (builders) => {
    builders.addCase(projectGraphData.pending, (state, action) => {
      state.loading = "pending"
    })
    builders.addCase(projectGraphData.fulfilled, (state, action) => {
      state.loading = "success"
      state.projectListData = action.payload?.reverse()
    })
    builders.addCase(projectGraphData.rejected, (state, action) => {
      state.loading = "error"
    })

    builders.addCase(projectGraphAmount.pending, (state, action) => {
      state.loading = "pending"
    })
    builders.addCase(projectGraphAmount.fulfilled, (state, action) => {
      state.loading = "success"
      state.projectAmountList = action.payload?.reverse()
    })
    builders.addCase(projectGraphAmount.rejected, (state, action) => {
      state.loading = "error"
    })

    builders.addCase(getAllCompanyAmountGrapgh.pending, (state, action) => {
      state.loading = "pending"
    })
    builders.addCase(getAllCompanyAmountGrapgh.fulfilled, (state, action) => {
      state.loading = "success"
      state.companyAmountList = action.payload
    })
    builders.addCase(getAllCompanyAmountGrapgh.rejected, (state, action) => {
      state.loading = "error"
    })
  },
})

export default DashboardSlice.reducer
