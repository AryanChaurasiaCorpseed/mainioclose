import React from "react"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { putQuery } from "../../API/PutQuery"

export const getUserProfilePhoto = createAsyncThunk(
  "profilePhoto",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/users/getProfile?userId=${id}`
    )
    return response.data
  }
)
export const updateProfilePhoto=createAsyncThunk('updateProfilePhoto',async(data)=>{
    const respose=await putQuery(`?userId=${data?.userId}&profilePic=${data?.profilePhoto}`)
    return respose.data
})

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profilePhoto: "",
    loading: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfilePhoto.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getUserProfilePhoto.fulfilled, (state, action) => {
      state.profilePhoto = action.payload
      state.loading = "fullfilled"
    })
    builder.addCase(getUserProfilePhoto.rejected, (state, action) => {
      state.loading = "rejected"
      state.loginLoading = false
    })
  },
})

export const {} = ProfileSlice.actions
export default ProfileSlice.reducer
