import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { postQuery } from "../../API/PostQuery"
import { deleteQuery } from "../../API/DeleteQuery"
import { putQuery } from "../../API/PutQuery"

export const getAllRating = createAsyncThunk("alluser/rating", async () => {
  const allRatings = await getQuery(
    `/leadService/api/v1/rating/getAllUserRating`
  )
  return allRatings?.data
})

export const createComments = createAsyncThunk(
  "createComments",
  async (data) => {
    const respose = await postQuery(
      `/leadService/api/v1/lead/createComment?comment=${data?.comment}`
    )
    return respose.data
  }
)

export const getAllComments = createAsyncThunk("getAllComments", async () => {
  const response = await getQuery(`/leadService/api/v1/lead/getAllComments`)
  return response.data
})

export const deleteComments = createAsyncThunk("deletecomments", async (id) => {
  const response = await deleteQuery(
    `/leadService/api/v1/lead/deleteComments?id=${id}`
  )
  return response.data
})

export const updateComments=createAsyncThunk('updateComments',async(data)=>{
  const response=await putQuery(`/leadService/api/v1/lead/updateComments?id=${data?.id}&comment=${data?.comment}`)
  return response.data
})

export const UserRatingSlice = createSlice({
  name: "rating",
  initialState: {
    allUserRating: [],
    UserRatingLoading: false,
    UserRatingError: false,
    allComments: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRating.pending, (state, action) => {
      state.UserRatingLoading = true
      state.UserRatingError = false
    })
    builder.addCase(getAllRating.fulfilled, (state, action) => {
      state.allUserRating = action.payload
      state.UserRatingLoading = false
      state.UserRatingError = false
    })
    builder.addCase(getAllRating.rejected, (state, action) => {
      state.UserRatingError = true
      state.UserRatingLoading = false
    })

    builder.addCase(getAllComments.pending, (state, action) => {
      state.UserRatingLoading = true
      state.UserRatingError = false
    })
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.allComments = action.payload
      state.UserRatingLoading = false
      state.UserRatingError = false
    })
    builder.addCase(getAllComments.rejected, (state, action) => {
      state.UserRatingError = true
      state.UserRatingLoading = false
    })
  },
})

export default UserRatingSlice.reducer
