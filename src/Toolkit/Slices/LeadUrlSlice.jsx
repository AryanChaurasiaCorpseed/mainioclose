import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { postQuery } from "../../API/PostQuery"
import { putQuery } from "../../API/PutQuery"

export const getAllUrlAction = createAsyncThunk(
  "showLeadUrlData",
  async ({page,size}) => {
    const showLeadUrl = await getQuery(
      `/leadService/api/v1/urls/getUrls?pageSize=${size}&pageNo=${page}`
    )
    return showLeadUrl?.data
  }
)

export const createAllUrlAction = createAsyncThunk(
  "createLeadUrlData",
  async (data) => {
    const createLeadUrl = await postQuery(
      `/leadService/api/v1/urls/createUrls`,
      data
    )
    return createLeadUrl?.data
  }
)

export const editUrls = createAsyncThunk("editUrls", async (data) => {
  const respose = await putQuery("/leadService/api/v1/urls/updateUrls", data)
  return respose.data
})

export const getAllUrlList=createAsyncThunk('allUrlsList',async()=>{
  const response=await getQuery(`/leadService/api/v1/urls/getAllUrls`)
  return response.data
})

export const convertUrlsToProduct=createAsyncThunk('convertUrlsToProduct',async(data)=>{
  const response=await postQuery(`/leadService/api/v1/product/importProductByUrls`,data)
  return response.data
})

export const getAllUrlCount=createAsyncThunk('getTotalUrlCount',async()=>{
  const response=await getQuery(`/leadService/api/v1/urls/getTotalUrlsCount`)
  return response.data
})

export const searchLeadUrlList=createAsyncThunk('searchLeadUrlList',async(name)=>{
  const response=await getQuery(`/leadService/api/v1/urls/getGlobalSearchUrls?name=${name}`)
  return response.data
})

export const LeadUrlSlice = createSlice({
  name: "leadurls",
  initialState: {
    createLeadUrl: [],
    createLeadUrlLoading: false,
    createLeadUrlError: false,
    allLeadUrl: [],
    allLeadUrlLoading: false,
    allLeadUrlError: false,
    page: 0,
    allUrlList:[],
    totalUrlCount:0
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
    builder.addCase(getAllUrlAction.pending, (state, action) => {
      state.allLeadUrlLoading = true
      state.allLeadUrlError = false
    })
    builder.addCase(getAllUrlAction.fulfilled, (state, action) => {
      state.allLeadUrl = action.payload
      state.allLeadUrlLoading = false
      state.allLeadUrlError = false
    })
    builder.addCase(getAllUrlAction.rejected, (state, action) => {
      state.allLeadUrlError = true
      state.allLeadUrlLoading = false
    })

    builder.addCase(createAllUrlAction.pending, (state, action) => {
      state.createLeadUrlLoading = true
      state.createLeadUrlError = false
    })
    builder.addCase(createAllUrlAction.fulfilled, (state, action) => {
      state.createLeadUrl = action.payload
      state.createLeadUrlLoading = false
      state.createLeadUrlError = false
    })
    builder.addCase(createAllUrlAction.rejected, (state, action) => {
      state.createLeadUrlError = true
      state.createLeadUrlLoading = false
    })

    builder.addCase(getAllUrlList.pending, (state, action) => {
      state.createLeadUrlLoading = true
      state.createLeadUrlError = false
    })
    builder.addCase(getAllUrlList.fulfilled, (state, action) => {
      state.allUrlList = action.payload
      state.createLeadUrlLoading = false
      state.createLeadUrlError = false
    })
    builder.addCase(getAllUrlList.rejected, (state, action) => {
      state.createLeadUrlError = true
      state.createLeadUrlLoading = false
    })

    builder.addCase(getAllUrlCount.pending, (state, action) => {
      state.createLeadUrlLoading = true
      state.createLeadUrlError = false
    })
    builder.addCase(getAllUrlCount.fulfilled, (state, action) => {
      state.totalUrlCount = action.payload
      state.createLeadUrlLoading = false
      state.createLeadUrlError = false
    })
    builder.addCase(getAllUrlCount.rejected, (state, action) => {
      state.createLeadUrlError = true
      state.createLeadUrlLoading = false
    })


    builder.addCase(searchLeadUrlList.pending, (state, action) => {
      state.createLeadUrlLoading = true
      state.createLeadUrlError = false
    })
    builder.addCase(searchLeadUrlList.fulfilled, (state, action) => {
      state.allLeadUrl = action.payload
      state.createLeadUrlLoading = false
      state.createLeadUrlError = false
    })
    builder.addCase(searchLeadUrlList.rejected, (state, action) => {
      state.createLeadUrlError = true
      state.createLeadUrlLoading = false
    })

  },
})
export const { handleNextPagination, handlePrevPagination } =
  LeadUrlSlice.actions

export default LeadUrlSlice.reducer
