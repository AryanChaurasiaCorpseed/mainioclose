import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { putQueryNoData } from "../../API/PutQueryWithoutData"


export const updateNotification = createAsyncThunk("updateNotifications", async (userid) => {
  const markNotification = await putQueryNoData(
    `/leadService/api/v1/notification/viewNotification?userId=${userid}`
  )
  return markNotification
})

export const getAllNotification= createAsyncThunk('getAllNotifiction',async(id)=>{
  const response = await getQuery(`/leadService/api/v1/notification/getAllNotification?userId=${id}`)
  return response.data
})



export const NotificationSlice = createSlice({
  name: "notify",
  initialState: {
    allNotifications: [],
    NotificationLoading: false,
    updateNotification: false,
  },
  extraReducers: (builder) => {
    builder.addCase(updateNotification.pending, (state, action) => {
      state.updateNotification = false;
    })
    builder.addCase(updateNotification.fulfilled, (state, action) => {
      state.updateNotification = true;
    })

    builder.addCase(updateNotification.rejected, (state, action) => {
      state.updateNotification = false;
    })


    builder.addCase(getAllNotification.pending, (state, action) => {
      state.NotificationLoading = true
    })
    builder.addCase(getAllNotification.fulfilled, (state, action) => {
      state.allNotifications = action.payload
    })
    builder.addCase(getAllNotification.rejected, (state, action) => {
      state.NotificationLoading = true
    })
  },
})

export default NotificationSlice.reducer
