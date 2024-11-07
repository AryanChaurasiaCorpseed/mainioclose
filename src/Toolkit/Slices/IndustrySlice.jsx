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

export const getAllIndustriesWithPagination=createAsyncThunk('getAllIndustriesWithPagination',async({page,size})=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllIndustryForIndustryPage?page=${page}&size=${size}`)
  return response.data
})

export const allIndstriesCount=createAsyncThunk('allIndstriesCount',async()=>{
  const response =await getQuery(`/leadService/api/v1/industryData/getAllIndustryCount`)
  return response.data
})


export const getAllIndustryDataWithPagination=createAsyncThunk('getAllIndustryDataWithPagination',async({page,size})=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllIndustryDataForPage?page=${page}&size=${size}`)
  return response.data
}) 

export const getIndustryDataCount=createAsyncThunk('getIndustryDataCount',async()=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllIndustryDataCount`)
  return response.data
})


export const getAllSubIndustryWithPagination=createAsyncThunk('getAllSubIndustryWithPagination',async({page,size})=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllSubIndustryForPage?page=${page}&size=${size}`)
  return response.data
})

export const getAllSubIndustyCount=createAsyncThunk('getAllSubIndustyCount',async()=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllSubIndustryCount`)
  return response.data
})


export const getAllSubSubIndustryWithPagination=createAsyncThunk('getAllSubSubIndustryWithPagination',async({page,size})=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllSubSubIndustryForPage?page=${page}&size=${size}`)
  return response.data
})

export const getTotalSubSubIndustryCount=createAsyncThunk('getTotalSubSubIndustryCount',async()=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllSubSubIndustryCount`)
  return response.data
})

export const getSubIndustryByIndustryId=createAsyncThunk('getSubIndustryByIndustryId',async(id)=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getSubIndustryByIndustryId?id=${id}`)
  return response.data
})

export const getSubSubIndustryBySubIndustryId=createAsyncThunk('getSubSubIndustryBySubIndustryId',async(id)=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllSubSubIndustryBySubIndustryId?id=${id}`)
  return response.data
})

export const getIndustryDataBySubSubIndustryId=createAsyncThunk('getIndustryDataBySubSubIndustryId',async(id)=>{
  const response=await getQuery(`/leadService/api/v1/industryData/getAllIndustryDataBySubSubIndustryId?id=${id}`)
  return response.data
})


const IndustrySlice = createSlice({
  name: "industry",
  initialState: {
    allIndustry: [],
    industryLoading: "",
    allSubIndustry: [],
    allSubsubIndustry: [],
    allMainIndustry:[],
    allIndustriesWithPage:[],
    allIndustryCount:0,
    allIndustryDataCount:0,
    allIndustryDataWithPage:[],
    allSubIndustryWithPage:[],
    allSubIndustryCount:0,
    totalSubSubIndustryCount:0,
    allSubSubIndustryWithPage:[],
    subIndustryListByIndustryId:[],
    subSubIndustryListBySubIndustryId:[],
    industryDataListBySubSubIndustryId:[]
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


    builder.addCase(getAllIndustriesWithPagination.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllIndustriesWithPagination.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allIndustriesWithPage = action.payload
    })
    builder.addCase(getAllIndustriesWithPagination.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allIndustriesWithPage=[]
    })




    builder.addCase(allIndstriesCount.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(allIndstriesCount.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allIndustryCount = action.payload
    })
    builder.addCase(allIndstriesCount.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allIndustryCount=0
    })


    builder.addCase(getAllIndustryDataWithPagination.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllIndustryDataWithPagination.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allIndustryDataWithPage = action.payload
    })
    builder.addCase(getAllIndustryDataWithPagination.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allIndustryDataWithPage=[]
    })


    builder.addCase(getIndustryDataCount.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getIndustryDataCount.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allIndustryDataCount = action.payload
    })
    builder.addCase(getIndustryDataCount.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allIndustryDataCount=0
    })


    builder.addCase(getAllSubIndustryWithPagination.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllSubIndustryWithPagination.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allSubIndustryWithPage = action.payload
    })
    builder.addCase(getAllSubIndustryWithPagination.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allSubIndustryWithPage=[]
    })

    builder.addCase(getAllSubIndustyCount.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllSubIndustyCount.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allSubIndustryCount = action.payload
    })
    builder.addCase(getAllSubIndustyCount.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allSubIndustryCount=0
    })

    builder.addCase(getAllSubSubIndustryWithPagination.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getAllSubSubIndustryWithPagination.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.allSubSubIndustryWithPage = action.payload
    })
    builder.addCase(getAllSubSubIndustryWithPagination.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.allSubSubIndustryWithPage=[]
    })


    builder.addCase(getTotalSubSubIndustryCount.pending, (state, action) => {
      state.industryLoading = "pending"
    })
    builder.addCase(getTotalSubSubIndustryCount.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.totalSubSubIndustryCount = action.payload
    })
    builder.addCase(getTotalSubSubIndustryCount.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.totalSubSubIndustryCount=0
    })

    builder.addCase(getSubIndustryByIndustryId.pending, (state, action) => {
      state.industryLoading = "pending"
      state.subIndustryListByIndustryId=[]
    })
    builder.addCase(getSubIndustryByIndustryId.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.subIndustryListByIndustryId = action.payload
    })
    builder.addCase(getSubIndustryByIndustryId.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.subIndustryListByIndustryId=[]
    })


    builder.addCase(getSubSubIndustryBySubIndustryId.pending, (state, action) => {
      state.industryLoading = "pending"
      state.subSubIndustryListBySubIndustryId=[]
    })
    builder.addCase(getSubSubIndustryBySubIndustryId.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.subSubIndustryListBySubIndustryId = action.payload
    })
    builder.addCase(getSubSubIndustryBySubIndustryId.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.subSubIndustryListBySubIndustryId=[]
    })

    builder.addCase(getIndustryDataBySubSubIndustryId.pending, (state, action) => {
      state.industryLoading = "pending"
      state.industryDataListBySubSubIndustryId=[]
    })
    builder.addCase(getIndustryDataBySubSubIndustryId.fulfilled, (state, action) => {
      state.industryLoading = "fulfilled"
      state.industryDataListBySubSubIndustryId = action.payload
    })
    builder.addCase(getIndustryDataBySubSubIndustryId.rejected, (state, action) => {
      state.industryLoading = "rejected"
      state.industryDataListBySubSubIndustryId=[]
    })



  },
})

export default IndustrySlice.reducer
