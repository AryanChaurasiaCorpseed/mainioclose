import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { putQuery } from "../../API/PutQuery"

export const getAllTickets = createAsyncThunk("allTickets", async (id) => {
  const allTickets = await getQuery(
    `/leadService/api/v1/getAllTicket?userId=${id}`
  )
  return allTickets?.data
})

export const editTicketStatus = createAsyncThunk(
  "editTickets",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/editTicketStatus?userId=${data?.userId}&status=${data?.status}&ticketId=${data?.ticketId}`
    )
    return response.data
  }
)

export const TicketSlice = createSlice({
  name: "tickets",
  initialState: {
    allTickets: [],
    TicketsLoading: false,
    TicketsError: false,
    ticketStatus: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTickets.pending, (state, action) => {
      state.TicketsLoading = true
    })
    builder.addCase(getAllTickets.fulfilled, (state, action) => {
      state.allTickets = action.payload
      state.TicketsLoading = false
    })
    builder.addCase(getAllTickets.rejected, (state, action) => {
      state.TicketsError = true
      state.TicketsLoading = false
    })

    builder.addCase(editTicketStatus.pending, (state, action) => {
      state.ticketStatus = "pending"
    })
    builder.addCase(editTicketStatus.fulfilled, (state, action) => {
      state.ticketStatus = "success"
    })
    builder.addCase(editTicketStatus.rejected, (state, action) => {
      state.ticketStatus = "rejected"
    })
  },
})

export default TicketSlice.reducer
