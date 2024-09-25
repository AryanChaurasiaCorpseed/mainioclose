import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"

export const emailChecker = createAsyncThunk("emailChecker", async (email) => {
  const response = await getQuery(
    `/leadService/api/v1/users/checkEmailExist?email=${email}`
  )
  return response
})
export const getDesiginationById = createAsyncThunk(
  "getDesiginationByID",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/designation/getAllDesignationByDepartment?departmentId=${id}`
    )
    return response.data
  }
)

export const getManagerById = createAsyncThunk("getManagerById", async (id) => {
  const response = await getQuery(
    `/leadService/api/v1/users/getUserManagerByDepartment?departmentId=${id}`
  )
  return response.data
})

export const getProcurementAssigneeList=createAsyncThunk('getProcurementAssigneeList',async(id)=>{
  const response=await getQuery(`/leadService/api/v1/users/fetchProcurementUsers?userId=${id}`)
  return response.data
})

const CommonSlice = createSlice({
  name: "common",
  initialState: {
    desiginationListById: [],
    loading: "",
    managerListById: [],
    procurementAssigneeList:[]
  },
  extraReducers: (builder) => {
    builder.addCase(getDesiginationById.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getDesiginationById.fulfilled, (state, action) => {
      state.loading = "success"
      state.desiginationListById = action.payload
    })
    builder.addCase(getDesiginationById.rejected, (state, action) => {
      state.loading = "rejected"
    })
    builder.addCase(getManagerById.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getManagerById.fulfilled, (state, action) => {
      state.loading = "success"
      state.managerListById = action.payload
    })
    builder.addCase(getManagerById.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getProcurementAssigneeList.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getProcurementAssigneeList.fulfilled, (state, action) => {
      state.loading = "success"
      state.procurementAssigneeList = action.payload
    })
    builder.addCase(getProcurementAssigneeList.rejected, (state, action) => {
      state.loading = "rejected"
    })


  },
})

export default CommonSlice.reducer
