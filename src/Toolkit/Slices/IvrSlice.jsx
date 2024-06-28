import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"

export const getAllIvr = createAsyncThunk("allIvrs", async () => {
  const response = await getQuery(`/leadService/api/v1/rating/getAllIvrData`)
  return response.data
})

export const createIvr = createAsyncThunk("createIvr", async (data) => {
  const response = await getQuery(
    `/leadService/api/v1/rating/createIvrData?callerNumber=${data?.callerNumber}&agentName=${data?.agentName}&aggentNumber=${data?.aggentNumber}&startTime=${data?.startTime}&duration=${data?.duration}&endTime=${data?.endTime}&callRecordingUrl=${data?.callRecordingUrl}`
  )
  return response.data
})

const IvrSlice = createSlice({
  name: "ivr",
  initialState: {
    allIvr: [],
    ivrLoading: false,
    ivrError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIvr.pending, (state, action) => {
      state.ivrLoading = true
    })
    builder.addCase(getAllIvr.fulfilled, (state, action) => {
      state.ivrLoading = false
      state.ivrError = false
      state.allIvr = action?.payload
    })
    builder.addCase(getAllIvr.rejected, (state, action) => {
      state.ivrError = true
    })
  },
})

export default IvrSlice.reducer
