import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQueryNoData } from "../../API/PostQueryNoDate"
import { getQuery } from "../../API/GetQuery"
import { putQuery } from "../../API/PutQuery"

export const leadSlugAction = createAsyncThunk(
  "createLeadSlugData",
  async (slugName) => {
    const allLeadSlug = await postQueryNoData(
      `/leadService/api/v1/slug/createSlug?name=${slugName}`
    )
    return allLeadSlug?.data
  }
)

export const getAllSlugAction = createAsyncThunk(
  "showLeadSlugData",
  async (pageNo) => {
    const showLeadSlug = await getQuery(
      `/leadService/api/v1/slug/getSlug?pageSize=${50}&pageNo=${pageNo}`
    )
    return showLeadSlug?.data
  }
)

export const editSulg = createAsyncThunk("editSlug", async (data) => {
  const response = await putQuery(
    `/leadService/api/v1/slug/updateSlug?name=${data?.name}&id=${data?.id}`
  )
  return response.data
})

export const LeadSlugSlice = createSlice({
  name: "leadslug",
  initialState: {
    leadSlug: {},
    leadSlugLoading: false,
    leadSlugError: false,
    allLeadSlug: [],
    allLeadSlugLoading: false,
    allLeadSlugError: false,
    page: 0,
  },
  reducers: {
    handleNextPagination: (state, action) => {
      state.page = state.page + 1
    },
    handlePrevPagination: (state, action) => {
      state.page = state.page >= 0 ? state.page - 1 : 0
    },
  },
  extraReducers: (builder) => {
    builder.addCase(leadSlugAction.pending, (state, action) => {
      state.leadSlugLoading = true
      state.leadSlugError = false
    })
    builder.addCase(leadSlugAction.fulfilled, (state, action) => {
      state.allLeads = action.payload
      state.leadSlugLoading = false
      state.leadSlugError = false
    })
    builder.addCase(leadSlugAction.rejected, (state, action) => {
      state.leadSlugError = true
      state.leadSlugLoading = false
    })

    builder.addCase(getAllSlugAction.pending, (state, action) => {
      state.allLeadSlugLoading = true
      state.allLeadSlugError = false
    })
    builder.addCase(getAllSlugAction.fulfilled, (state, action) => {
      state.allLeadSlug = action.payload
      state.allLeadSlugLoading = false
      state.allLeadSlugError = false
    })
    builder.addCase(getAllSlugAction.rejected, (state, action) => {
      state.allLeadSlugError = true
      state.allLeadSlugLoading = false
    })

    builder.addCase(editSulg.pending, (state, action) => {
      state.allLeadSlugLoading = true
      state.allLeadSlugError = false
    })
    builder.addCase(editSulg.fulfilled, (state, action) => {
      let data = action?.payload
      let tempdata = [...state?.allLeadSlug]
      const index = tempdata.findIndex((obj) => obj.id === data?.id)
      tempdata[index] = data
      state.allLeadSlug = tempdata
      state.allLeadSlugLoading = false
      state.allLeadSlugError = false
    })
    builder.addCase(editSulg.rejected, (state, action) => {
      state.allLeadSlugError = true
      state.allLeadSlugLoading = false
    })
  },
})
export const { handleNextPagination, handlePrevPagination } =
LeadSlugSlice.actions
export default LeadSlugSlice.reducer
