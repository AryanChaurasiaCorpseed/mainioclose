import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../../API/GetQuery"
import { putQueryNoData } from "../../API/PutQueryWithoutData"
import { putQuery } from "../../API/PutQuery"
import { postQuery } from "../../API/PostQuery"

export const getAllUsers = createAsyncThunk("allUsers", async () => {
  const allUser = await getQuery(`/leadService/api/v1/users/getAllUser`)
  return allUser?.data
})

export const headHrUser = createAsyncThunk(
  "allhrUserApprovalList",
  async (id) => {
    const allDataUser = await getQuery(
      `/leadService/api/v1/hrManagment/getUserApprovalHr?userId=${id}`
    )
    return allDataUser?.data
  }
)

export const allManagerUser = createAsyncThunk(
  "allManagerUserApprovalList",
  async (id) => {
    const managerUserData = await getQuery(
      `/leadService/api/v1/users/getUserForManager?id=${id}`
    )
    return managerUserData?.data
  }
)

export const editUserLockerCount = createAsyncThunk(
  "editLockerCount",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/users/updateLockerCount?id=${data?.id}&count=${data?.count}&currentUserId=${data?.userId}`
    )
    return response.data
  }
)

export const allDeactivateUserFun = createAsyncThunk(
  "allDeactivateUserApprovalList",
  async () => {
    const deactivateUserData = await getQuery(
      `/leadService/api/v1/users/getAllDeactivateUser`
    )
    return deactivateUserData?.data
  }
)

export const allActiveUserFun = createAsyncThunk(
  "allActivateUserApprovalList",
  async ({ currentUserId, id }) => {
    const statusUserData = await putQueryNoData(
      `/leadService/api/v1/users/autoActive?userId=${id}&currentUser=${currentUserId}`
    )
    return statusUserData?.data
  }
)

export const editUserRatingAssignee = createAsyncThunk(
  "editUserAsignee",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/rating/updateUserRatingService`,
      data
    )
    return response.data
  }
)

export const addNewUser = createAsyncThunk("newUser", async (data) => {
  const response = await postQuery(
    ` /securityService/api/auth/createNewUserByEmail`,
    data
  )
  return response
})

export const createLeadUserbyEmail = createAsyncThunk(
  "createLeadUser",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/users/createUserByEmail`,
      data
    )
    return response.data
  }
)
export const updateLeadUser = createAsyncThunk(
  "updateLeadUser",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/users/updateUserData`,
      data
    )
    return response
  }
)

export const updateUserData = createAsyncThunk("updateUser", async (data) => {
  const response = await putQuery(
    `/securityService/api/auth/updateUserData`,
    data
  )
  return response
})

export const updateLeadUserData = createAsyncThunk(
  "updateLeadData",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/users/updateUserData`,
      data
    )
    return response.data
  }
)

export const getAllRoles = createAsyncThunk("allRoles", async () => {
  const response = await getQuery(`/securityService/api/v1/roles/getRole`)
  return response.data
})

export const createdLeadByHr = createAsyncThunk(
  "createdLeadbyHr",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/users/createUserByHr`,
      data
    )
    return response
  }
)

export const updateLeadByHr=createAsyncThunk('upDateLeadByHr',async(data)=>{
  const response =await putQuery(`/leadService/api/v1/users/editUserByHr`,data)
  return response
})



export const UsersSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    userLoading: false,
    userError: false,
    allHRUsers: [],
    userHRLoading: false,
    userHRError: false,
    allManagerUsers: [],
    userManagerLoading: false,
    userManagerError: false,
    allDeactivateUsers: [],
    userDeactivateLoading: false,
    userDeactivateError: false,
    userActive: "",
    userActiveLoading: false,
    userActiveError: false,
    assigneeLoading: "",
    leadUserList: {},
    allRoles: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.userLoading = true
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload
      state.userLoading = false
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.userError = true
      state.userLoading = false
    })

    builder.addCase(headHrUser.pending, (state, action) => {
      state.userHRLoading = true
    })
    builder.addCase(headHrUser.fulfilled, (state, action) => {
      state.allHRUsers = action.payload
      state.userHRLoading = false
    })
    builder.addCase(headHrUser.rejected, (state, action) => {
      state.userHRError = true
      state.userHRLoading = false
    })

    builder.addCase(allManagerUser.pending, (state, action) => {
      state.userManagerLoading = true
    })
    builder.addCase(allManagerUser.fulfilled, (state, action) => {
      state.allManagerUsers = action.payload
      state.userManagerLoading = false
    })
    builder.addCase(allManagerUser.rejected, (state, action) => {
      state.userManagerError = true
      state.userManagerLoading = false
    })

    builder.addCase(allDeactivateUserFun.pending, (state, action) => {
      state.userDeactivateLoading = true
    })
    builder.addCase(allDeactivateUserFun.fulfilled, (state, action) => {
      state.allDeactivateUsers = action.payload
      state.userDeactivateLoading = false
    })
    builder.addCase(allDeactivateUserFun.rejected, (state, action) => {
      state.userDeactivateError = true
      state.userDeactivateLoading = false
    })

    builder.addCase(allActiveUserFun.pending, (state, action) => {
      state.userActiveLoading = true
    })
    builder.addCase(allActiveUserFun.fulfilled, (state, action) => {
      state.userActive = action.payload
      state.userActiveLoading = false
    })
    builder.addCase(allActiveUserFun.rejected, (state, action) => {
      state.userActiveError = true
      state.userActiveLoading = false
    })

    builder.addCase(editUserRatingAssignee.pending, (state, action) => {
      state.assigneeLoading = "pending"
    })
    builder.addCase(editUserRatingAssignee.fulfilled, (state, action) => {
      state.assigneeLoading = "success"
    })
    builder.addCase(editUserRatingAssignee.rejected, (state, action) => {
      state.assigneeLoading = "rejected"
    })

    builder.addCase(addNewUser.pending, (state, action) => {
      state.assigneeLoading = "pending"
    })
    builder.addCase(addNewUser.fulfilled, (state, action) => {
      state.assigneeLoading = "success"
      state.leadUserList = action.payload
    })
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.assigneeLoading = "rejected"
    })

    builder.addCase(createLeadUserbyEmail.pending, (state, action) => {
      state.assigneeLoading = "pending"
    })
    builder.addCase(createLeadUserbyEmail.fulfilled, (state, action) => {
      state.assigneeLoading = "success"
    })
    builder.addCase(createLeadUserbyEmail.rejected, (state, action) => {
      state.assigneeLoading = "rejected"
    })

    builder.addCase(getAllRoles.pending, (state, action) => {
      state.assigneeLoading = "pending"
    })
    builder.addCase(getAllRoles.fulfilled, (state, action) => {
      state.assigneeLoading = "success"
      state.allRoles = action.payload
    })
    builder.addCase(getAllRoles.rejected, (state, action) => {
      state.assigneeLoading = "rejected"
    })
  },
})

export default UsersSlice.reducer
