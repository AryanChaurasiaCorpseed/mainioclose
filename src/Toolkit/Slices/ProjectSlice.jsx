import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"

export const getProjectAction = createAsyncThunk(
  "getallProjectData",
  async ({ id }) => {
    const getProjectData = await getQuery(
      `/leadService/api/v1/project/getAllProject?userId=${id}`
    )
    return getProjectData?.data
  }
)

export const getAllProjectList=createAsyncThunk('getAllProjectList',async()=>{
  const response = await getQuery(`/leadService/api/v1/project/getAllProjectNameAndId`)
  return response.data
})

const ProjectSlice = createSlice({
  name: "project",
  initialState: {
    allProject: [],
    loadingProject: false,
    errorProject: false,
    allProjectList:[]
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectAction.pending, (state, action) => {
      state.loadingProject = true
      state.errorProject = false
    })
    builder.addCase(getProjectAction.fulfilled, (state, action) => {
      state.allProject = action.payload
      state.loadingProject = false
      state.errorProject = false
    })
    builder.addCase(getProjectAction.rejected, (state, action) => {
      state.errorProject = true
      state.loadingProject = false
    })

    builder.addCase(getAllProjectList.pending, (state, action) => {
      state.loadingProject = true
      state.errorProject = false
    })
    builder.addCase(getAllProjectList.fulfilled, (state, action) => {
      state.allProjectList = action.payload
      state.loadingProject = false
      state.errorProject = false
    })
    builder.addCase(getAllProjectList.rejected, (state, action) => {
      state.errorProject = true
      state.loadingProject = false
    })
  },
})

export default ProjectSlice.reducer
