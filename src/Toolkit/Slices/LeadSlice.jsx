import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQuery } from "../../API/PostQuery"
import { putQuery } from "../../API/PutQuery"

export const getAllLeads = createAsyncThunk("allLeadsData", async (data) => {
  const allLeads = await postQuery(`/leadService/api/v1/lead/getAllLead`, data)
  return allLeads?.data?.reverse()
})

export const updateAutoAssignnee = createAsyncThunk(
  "auto-lead-assignee",
  async (data) => {
    const autoresponse = await putQuery(
      `/leadService/api/v1/lead/updateStatusAndAutoSame`,
      data
    )
    return autoresponse?.data
  }
)
export const editLeadStatus = createAsyncThunk(
  "editLeadStatus",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/status/updateInLeadStatus`,
      data
    )
    return response.data
  }
)

export const createRemakWithFile = createAsyncThunk(
  "createRemark",
  async (data) => {
    const response = await postQuery(`/leadService/api/v1/createRemarks`, data)
    return response.data
  }
)

export const craeteProjectByLeadId=createAsyncThunk('leadProjectByLeadId',async(id)=>{
  const response=await postQuery(`/leadService/api/v1/project/createProjectV2?leadId=${id}`)
  return response.data
})

export const LeadSlice = createSlice({
  name: "lead",
  initialState: {
    allLeads: [],
    leadsLoading: false,
    leadsError: false,
    autoLeadUpadte: "",
    autoLeadLoading: false,
    autoLeadError: false,
    remarkLoading: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllLeads.pending, (state, action) => {
      state.leadsLoading = true
      state.leadsError = false
    })
    builder.addCase(getAllLeads.fulfilled, (state, action) => {
      state.allLeads = action.payload
      state.leadsLoading = false
      state.leadsError = false
    })
    builder.addCase(getAllLeads.rejected, (state, action) => {
      state.leadsError = true
      state.leadsLoading = false
    })

    builder.addCase(updateAutoAssignnee.pending, (state, action) => {
      state.autoLeadLoading = true
      state.autoLeadError = false
    })
    builder.addCase(updateAutoAssignnee.fulfilled, (state, action) => {
      state.autoLeadUpadte = action.payload
      state.autoLeadLoading = false
      state.autoLeadError = false
    })
    builder.addCase(updateAutoAssignnee.rejected, (state, action) => {
      state.autoLeadError = true
      state.autoLeadLoading = false
    })

    builder.addCase(createRemakWithFile.pending, (state, action) => {
      state.remarkLoading = "pending"
    })
    builder.addCase(createRemakWithFile.fulfilled, (state, action) => {
      state.remarkLoading = "success"
    })
    builder.addCase(createRemakWithFile.rejected, (state, action) => {
      state.remarkLoading = "rejected"
    })
  },
})

export default LeadSlice.reducer
