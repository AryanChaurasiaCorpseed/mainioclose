import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQuery } from "../../API/PostQuery"
import { putQuery } from "../../API/PutQuery"
import { getQuery } from "../../API/GetQuery"
import { deleteQuery } from "../../API/DeleteQuery"

export const getAllLeads = createAsyncThunk("allLeadsData", async (data) => {
  const allLeads = await postQuery(
    `/leadService/api/v1/lead/getAllLead?page=${data?.page}&size=50`,
    data
  )
  return allLeads?.data
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

export const craeteProjectByLeadId = createAsyncThunk(
  "leadProjectByLeadId",
  async (id) => {
    const response = await postQuery(
      `/leadService/api/v1/project/createProjectV2?leadId=${id}`
    )
    return response.data
  }
)

export const getAllLeadsWithLabelId = createAsyncThunk(
  "getAllLeadswithLabel",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/lead/getAllLeadNameAndId`
    )
    return response.data
  }
)

export const updateHelper = createAsyncThunk("updateHelper", async (data) => {
  const response = await putQuery(
    `/leadService/api/v1/lead/updateHelper?userId=${data?.userId}&leadId=${data?.leadId}`
  )
  return response.data
})

export const createLead = createAsyncThunk(
  "createLead",
  async (createStatus) => {
    const response = await postQuery(
      `/leadService/api/v1/status/CreateLeadStatus`,
      createStatus
    )
    return response.data
  }
)

export const createLeadCateogry = createAsyncThunk(
  "createLeadCategory",
  async (leadCategory) => {
    const response = await postQuery(
      `/leadService/api/v1/category/createCategory`,
      leadCategory
    )
    return response.data
  }
)

export const createLeads = createAsyncThunk("createLeads", async (data) => {
  const response = await postQuery(`/leadService/api/v1/lead/createLead`, data)
  return response.data
})

export const getAllLeadUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await getQuery(`/leadService/api/v1/users/getAllUser`)
  return response.data
})

export const createLeadContacts = createAsyncThunk(
  "createLeadContact",
  async (createContact) => {
    const response = await postQuery(
      `/leadService/api/v1/client/createClient`,
      createContact
    )
    return response.data
  }
)

export const updateLeadsContact = createAsyncThunk(
  "updateContacts",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/client/updateClientInfo`,
      data
    )
    return response.data
  }
)
export const deleteLeadContact = createAsyncThunk(
  "deleteLeadContacts",
  async (data) => {
    const response = await deleteQuery(
      `/leadService/api/v1/client/deleteClient?leadId=${data?.leadid}&clientId=${data?.id}&currentUserId=${data?.userid}`
    )
    return response.data
  }
)

export const createNewLeadTask = createAsyncThunk(
  "newLeadTask",
  async (taskData) => {
    const response = await postQuery(
      `/leadService/api/v1/task/createTask`,
      taskData
    )
    return response.data
  }
)

export const updateLeadTask = createAsyncThunk(
  "updateLeadTasd",
  async (addNewTask) => {
    const response = await postQuery(
      `/leadService/api/v1/task/updateTaskData`,
      addNewTask
    )
    return response.data
  }
)

export const getAllTaskStatus = createAsyncThunk("allTaskStatus", async () => {
  const response = await getQuery(`/leadService/api/v1/getAllTaskStatus`)
  return response.data
})

export const getAllOppurtunities = createAsyncThunk(
  "getAllOppurtunities",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/leadOpportunity/getAllOpportunity`
    )
    return response.data
  }
)

export const getAllProductData = createAsyncThunk(
  "getAllProductData",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/product/getAllProducts`
    )
    return response.data
  }
)

export const getAllLeadUser = createAsyncThunk(
  "getAllLeadUserss",
  async (userid) => {
    const response = await getQuery(
      `/leadService/api/v1/users/getAllUserByHierarchy?userId=${userid}`
    )
    return response.data
  }
)

export const deleteProduct = createAsyncThunk("deleteProduct", async (data) => {
  const response = await putQuery(
    `/leadService/api/v1/lead/deleteProductInLead?leadId=${data?.leadid}&serviceId=${data?.serviceId}&userId=${data?.userid}`
  )
  return response.data
})

export const deleteTask = createAsyncThunk("deleteTask", async (data) => {
  const response = await deleteQuery(
    `/leadService/api/v1/task/deleteTaskById?taskId=${data?.id}&currentUserId=${data?.userid}`
  )
  return response.data
})

export const updateLeadProducts = createAsyncThunk(
  "updateLeadProduct",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/createProductInLead`,
      data
    )
    return response.data
  }
)

export const getAllProductWithCattegory = createAsyncThunk(
  "getAllProductWithCattegory",
  async () => {
    const response = await getQuery(
      "/leadService/api/v1/category/getAllCategories"
    )
    return response.data
  }
)

export const getAllStatusData = createAsyncThunk(
  "getAllStatusData",
  async () => {
    const response = await getQuery(`/leadService/api/v1/status/getAllStatus`)
    return response.data
  }
)

export const editViewData = createAsyncThunk("editViewData", async (leadid) => {
  const response = await getQuery(
    `/leadService/api/v1/inbox/editView?leadId=${leadid}`
  )
  return response.data
})

export const getCompanyDetailsByLeadId = createAsyncThunk(
  "getCompanyDetailsByLeadId",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/company/checkCompanyExist?leadId=${id}`
    )
    return response.data
  }
)

export const getCompanyUnitsById = createAsyncThunk(
  "getCompanyUnits",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllCompanyUnit?id=${id}`
    )
    return response.data
  }
)

export const getCompanyDetailsByGst = createAsyncThunk(
  "getCompanyDetailsByGst",
  async (gst) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getCompanyByGst?gst=${gst}`
    )
    return response.data
  }
)
export const getCompanyByUnitId = createAsyncThunk(
  "getCompanyByUnitId",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getCompanyById?id=${id}`
    )
    return response.data
  }
)

export const getAllContactDetails = createAsyncThunk(
  "getAllContactDetail",
  async () => {
    const response = await getQuery(`/leadService/api/v1/contact/getAllContact`)
    return response.data
  }
)

export const getContactById = createAsyncThunk(`contactById`, async (id) => {
  const response = await getQuery(
    `/leadService/api/v1/contact/getContactById?id=${id}`
  )
  return response.data
})

export const createCompanyForm = createAsyncThunk(
  "createCompanyForm",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/company/createCompanyForm`,
      data
    )
    return response.data
  }
)

export const updateStatusById = createAsyncThunk(
  "updateStatebyid",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/company/updateCompanyStatus?status=${data?.status}&id=${data?.id}&currentUserId=${data?.userid}`
    )
    return response.data
  }
)

export const deleteMultipleLeads = createAsyncThunk(
  "deleteMultipleLeads",
  async (data) => {
    console.log("sdklnvlakdjbvlkjaxb", data)
    const response = await deleteQuery(
      `/leadService/api/v1/lead/deleteMultiLead`,
      data
    )
    return response.data
  }
)

export const multiAssignedLeads = createAsyncThunk(
  "multiAssignedLeads",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/updateMultiLeadAssigne`,
      data
    )
    return response.data
  }
)

export const handleViewHistory = createAsyncThunk(
  "viewHistory",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/viewHistoryCreate?userId=${data?.userid}&leadId=${data?.leadId}`
    )
    return response.data
  }
)

export const updateAssigneeInLeadModule = createAsyncThunk(
  "updateAssigneeInLeadModule",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/updateAssignee?leadId=${data?.leadId}&userId=${data?.id}&updatedById=${data?.userid}`
    )
    return response.data
  }
)

export const handleDeleteSingleLead = createAsyncThunk(
  "handleDeleteSingleLead",
  async (data) => {
    const response = await deleteQuery(
      `/leadService/api/v1/lead/deleteLead?leadId=${data?.id}&userId=${data?.userid}`
    )
    return response.data
  }
)

export const handleLeadassignedToSamePerson = createAsyncThunk(
  "leadAssigndToSamePerson",
  async (id) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/leadAssignSamePerson?leadId=${id}`
    )
    return response.data
  }
)

export const changeLeadStatus = createAsyncThunk(
  "changeLeadStatus",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/status/updateLeadStatus?leadId=${data?.leadid}&statusId=${data?.statusId}&currentUserId=${data?.userid}`
    )
    return response.data
  }
)

export const updateOriginalNameInLeads = createAsyncThunk(
  "updateOriginalName",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/updateLeadOriginalName`,
      data
    )
    return response.data
  }
)

export const changeLeadAssigneeLeads = createAsyncThunk(
  "changeLeadAssignee",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/updateAssignee?leadId=${data?.leadid}&userId=${data?.id}&updatedById=${data?.userid}`
    )
    return response.data
  }
)

export const updateSingleLeadName = createAsyncThunk(
  "updateSingleLeadName",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/updateLeadName?leadName=${data?.updatedLeadName}&leadId=${data?.leadid}&userId=${data?.userid}`
    )
    return response.data
  }
)

export const getAllTaskData = createAsyncThunk("getAllTaskData", async (id) => {
  const response = await getQuery(
    `/leadService/api/v1/task/getAllTaskByLead?leadId=${id}`
  )
  return response.data
})

export const getSingleLeadDataByLeadID = createAsyncThunk(
  "getSingleLeadData",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/lead/getSingleLeadData?leadId=${data?.leadid}&currentUserId=${data?.userid}`
    )
    return response.data
  }
)

export const createTicket = createAsyncThunk("createTicket", async (data) => {
  const response = await postQuery(`/leadService/api/v1/createTicket`, data)
  return response.data
})

export const getLeadNotificationCount = createAsyncThunk(
  "getNotificationLead",
  async (userid) => {
    const response = await getQuery(
      `/leadService/api/v1/notification/getUnseenCount?userId=${userid}`
    )
    return response.data
  }
)

export const searchLeads = createAsyncThunk("searchLeads", async (data) => {
  const response = await getQuery(
    `/leadService/api/v1/lead/searchLead?searchParam=${data.input}&userId=${data.id}`
  )
  return response.data
})

export const updateLeadDescription = createAsyncThunk(
  "updateLeadDescription",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/lead/updateLeadDescription?leadId=${data?.id}&desc=${data?.description}`
    )
    return response.data
  }
)

export const getAllRemarkAndCommnts = createAsyncThunk(
  "getAllRemarks",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/getAllRemarks?leadId=${id}`
    )
    return response.data
  }
)

export const addVendorsDetail = createAsyncThunk(
  "vendorsDetail",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/vendor/create-vendor-request?leadId=${data?.leadId}&userId=${data?.userId}`,
      data?.data
    )
    return response.data
  }
)

export const getVendorDetailList = createAsyncThunk(
  "getVendorDetail",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/vendor/find-vendor-request-by-user-id?userId=${data?.userid}&leadId=${data?.leadId}`
    )
    return response.data
  }
)

export const updateRemarks = createAsyncThunk("updateRemarks", async (data) => {
  const response = await putQuery(`/leadService/api/v1/updateRemark`, data)
  return response.data
})

export const deleteRemarks = createAsyncThunk("deleteRemarks", async (data) => {
  const response = await deleteQuery(
    `/leadService/api/v1/deleteRemark?remarkId=${data?.remarkId}&currentUser=${data?.userid}&leadId=${data?.leadid}`
  )
  return response.data
})

export const updateVendorStatus = createAsyncThunk(
  "updateVendorStatus",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/vendor/update-vendor-request?vendorId=${data?.vendorId}&userId=${data?.userId}&leadId=${data?.leadId}`,
      data?.data
    )
    return response.data
  }
)

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
    allLeadsWithLabel: [],
    allLeadUsers: [],
    loading: "",
    allTaskStatusData: [],
    allOportunities: [],
    allProductData: [],
    getAllLeadUserData: [],
    categoryData: [],
    getAllStatus: [],
    companyDetailsById: {},
    companyUnits: [],
    companyDetailsByGst: [],
    companyDetailByUnitId: {},
    allContactList: [],
    contactDetail: {},
    getSingleLeadTask: [],
    singleLeadResponseData: {},
    allProductsList: [],
    clientsContact: [],
    notificationCount: 0,
    page: 0,
    remarkData: [],
    navigateLeadId: null,
    vendorsList: [],
  },
  reducers: {
    handleLoadingState: (state, action) => {
      state.loading = action.payload
    },
    handleNextPagination: (state, action) => {
      state.page = state.page + 1
    },
    handlePrevPagination: (state, action) => {
      state.page = state.page >= 0 ? state.page - 1 : 0
    },
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

    builder.addCase(getAllLeadsWithLabelId.pending, (state, action) => {
      state.remarkLoading = "pending"
    })
    builder.addCase(getAllLeadsWithLabelId.fulfilled, (state, action) => {
      state.remarkLoading = "success"
      state.allLeadsWithLabel = action.payload
    })
    builder.addCase(getAllLeadsWithLabelId.rejected, (state, action) => {
      state.remarkLoading = "rejected"
    })

    builder.addCase(getAllLeadUsers.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllLeadUsers.fulfilled, (state, action) => {
      state.loading = "success"
      state.allLeadUsers = action.payload
    })
    builder.addCase(getAllLeadUsers.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllTaskStatus.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllTaskStatus.fulfilled, (state, action) => {
      state.loading = "success"
      state.allTaskStatusData = action.payload
    })
    builder.addCase(getAllTaskStatus.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllOppurtunities.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllOppurtunities.fulfilled, (state, action) => {
      state.loading = "success"
      state.allOportunities = action.payload
    })
    builder.addCase(getAllOppurtunities.rejected, (state, action) => {
      state.loading = "rejected"
    })
    builder.addCase(getAllProductData.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllProductData.fulfilled, (state, action) => {
      state.loading = "success"
      state.allProductData = action.payload
    })
    builder.addCase(getAllProductData.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllLeadUser.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllLeadUser.fulfilled, (state, action) => {
      state.loading = "success"
      state.getAllLeadUserData = action.payload
    })
    builder.addCase(getAllLeadUser.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllProductWithCattegory.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllProductWithCattegory.fulfilled, (state, action) => {
      state.loading = "success"
      state.categoryData = action.payload
    })
    builder.addCase(getAllProductWithCattegory.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllStatusData.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllStatusData.fulfilled, (state, action) => {
      state.loading = "success"
      state.getAllStatus = action.payload
    })
    builder.addCase(getAllStatusData.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getCompanyDetailsByLeadId.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getCompanyDetailsByLeadId.fulfilled, (state, action) => {
      state.loading = "success"
      state.companyDetailsById = action.payload
    })
    builder.addCase(getCompanyDetailsByLeadId.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getCompanyUnitsById.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getCompanyUnitsById.fulfilled, (state, action) => {
      state.loading = "success"
      state.companyUnits = action.payload
    })
    builder.addCase(getCompanyUnitsById.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getCompanyDetailsByGst.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getCompanyDetailsByGst.fulfilled, (state, action) => {
      state.loading = "success"
      state.companyDetailsByGst = action.payload
    })
    builder.addCase(getCompanyDetailsByGst.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getCompanyByUnitId.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getCompanyByUnitId.fulfilled, (state, action) => {
      state.loading = "success"
      state.companyDetailByUnitId = action.payload
    })
    builder.addCase(getCompanyByUnitId.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllContactDetails.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllContactDetails.fulfilled, (state, action) => {
      state.loading = "success"
      state.allContactList = action.payload
    })
    builder.addCase(getAllContactDetails.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getContactById.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getContactById.fulfilled, (state, action) => {
      state.loading = "success"
      state.contactDetail = action.payload
    })
    builder.addCase(getContactById.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllTaskData.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllTaskData.fulfilled, (state, action) => {
      state.loading = "success"
      state.getSingleLeadTask = action.payload
    })
    builder.addCase(getAllTaskData.rejected, (state, action) => {
      state.loading = "rejected"
    })
    builder.addCase(getSingleLeadDataByLeadID.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getSingleLeadDataByLeadID.fulfilled, (state, action) => {
      state.loading = "success"
      state.singleLeadResponseData = action.payload
      state.allProductsList = action?.payload?.serviceDetails
      state.clientsContact = action?.payload?.clients?.reverse()
    })
    builder.addCase(getSingleLeadDataByLeadID.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getLeadNotificationCount.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getLeadNotificationCount.fulfilled, (state, action) => {
      state.loading = "success"
      state.notificationCount = action.payload
    })
    builder.addCase(getLeadNotificationCount.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(searchLeads.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(searchLeads.fulfilled, (state, action) => {
      state.loading = "success"
      state.allLeads = action.payload
    })
    builder.addCase(searchLeads.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getAllRemarkAndCommnts.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getAllRemarkAndCommnts.fulfilled, (state, action) => {
      state.loading = "success"
      state.remarkData = action?.payload?.reverse()
    })
    builder.addCase(getAllRemarkAndCommnts.rejected, (state, action) => {
      state.loading = "rejected"
    })

    builder.addCase(getVendorDetailList.pending, (state, action) => {
      state.loading = "pending"
    })
    builder.addCase(getVendorDetailList.fulfilled, (state, action) => {
      state.loading = "success"
      state.vendorsList = action?.payload
    })
    builder.addCase(getVendorDetailList.rejected, (state, action) => {
      state.loading = "rejected"
    })
  },
})
export const {
  handleLoadingState,
  handleNextPagination,
  handlePrevPagination,
} = LeadSlice.actions
export default LeadSlice.reducer
