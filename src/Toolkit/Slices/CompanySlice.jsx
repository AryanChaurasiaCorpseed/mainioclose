import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuery } from "../../API/GetQuery";
import { postQuery } from "../../API/PostQuery";
import { putQuery } from "../../API/PutQuery";
import { deleteQuery } from "../../API/DeleteQuery";
import { deleteQueryWithData } from "../../API/DeleteQueryWithData";

export const getCompanyAction = createAsyncThunk(
  "getallCompanyData",
  async ({ id, page, filterUserId, size }) => {
    const getCompanyData = await getQuery(
      `/leadService/api/v1/company/getAllCompany?userId=${id}&filterUserId=${filterUserId}&page=${page}&size=${size}`
    );
    return getCompanyData?.data;
  }
);

export const getCompanyProjectAction = createAsyncThunk(
  "get-company-project-action",
  async ({ id }) => {
    const getCompanyProjectData = await getQuery(
      `/leadService/api/v1/company/getAllProjectByCompany?companyId=${id}`
    );
    return getCompanyProjectData?.data;
  }
);

export const getCompanyLeadsAction = createAsyncThunk(
  "get-company-leads-action",
  async ({ id }) => {
    const getCompanyLeadsData = await getQuery(
      `/leadService/api/v1/company/getAllLeadByCompany?companyId=${id}`
    );
    return getCompanyLeadsData?.data;
  }
);

export const createCompany = createAsyncThunk("createCompany", async (data) => {
  const response = await postQuery(
    `/leadService/api/v1/company/createCompany`,
    data
  );
  return response.data;
});
export const getAllComapany = createAsyncThunk("getAllComapny", async (id) => {
  const response = await getQuery(
    `/leadService/api/v1/company/getAllCompany?userId=${id}`
  );
  return response.data;
});

export const getAllParentCompany = createAsyncThunk(
  "allParentCompany",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllParentCompany`
    );
    return response.data;
  }
);

export const createCompanyByLeads = createAsyncThunk(
  "createCompanyByLeads",
  async (data) => {
    const response = await postQuery(
      `/leadService/api/v1/company/createCompanyForm`,
      data
    );
    return response.data;
  }
);

export const getAllLeadCompanyies = createAsyncThunk(
  "getAllLeadCompanyies",
  async () => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllCompanyForm`
    );
    return response.data;
  }
);

export const getAllCompanyByStatus = createAsyncThunk(
  "getCompaniesByStatus",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllCompanyFormByStatus?status=${data.status}&userId=${data?.id}&page=${data?.page}&size=${data?.size}`
    );
    return response.data;
  }
);

export const getAllCompanyUnits = createAsyncThunk(
  "getAllCompanyUnits",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllCompanyUnit?id=${id}`
    );
    return response.data;
  }
);

export const updateCompanyAssignee = createAsyncThunk(
  "updateCompanyAssignee",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/company/updateCompanyAssignee?companyId=${data?.companyId}&assigneeId=${data?.assigneeId}&currentUserId=${data?.currentUserId}`
    );
    return response.data;
  }
);

export const getCompanyDetailsById = createAsyncThunk(
  "getCompanyDetailsById",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getSingleCompanyForm?id=${id}`
    );
    return response.data;
  }
);

export const updateCompanyForm = createAsyncThunk(
  "updateCompanyForm",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/company/updateCompanyForm`,
      data
    );
    return response.data;
  }
);

export const searchCompanyForm = createAsyncThunk(
  "searchCompanyForm",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/company/searchCompanyByStatus?searchNameAndGSt=${data?.inputText}&userId=${data?.userId}&status=${data?.status}&page=${data?.page}&size=${data?.size}`
    );
    return response.data;
  }
);

export const searchCompany = createAsyncThunk("searchCompany", async (data) => {
  const response = await getQuery(
    `/leadService/api/v1/company/fetchAllCompanyDetails?searchNameAndGSt=${data?.inputText}&userId=${data?.userId}`
  );
  return response.data;
});

export const getFormComment = createAsyncThunk("getFormComment", async (id) => {
  const response = await getQuery(
    `/leadService/api/v1/company/getCompanyComment?companyFormId=${id}`
  );
  return response.data;
});

export const addCommentCompanyForm = createAsyncThunk(
  "addCommentCompanyForm",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/company/addComment?companyFormId=${data?.id}&comment=${data?.comment}`
    );
    return response.data;
  }
);

export const updateMultiCompanyAssignee = createAsyncThunk(
  "updateMultiAssignee",
  async (data) => {
    const response = putQuery(
      `/leadService/api/v1/company/updateMultiCompanyAssignee`,
      data
    );
    return response.data;
  }
);

export const getHistoryByCompanyId = createAsyncThunk(
  "getCompanyByHistoryId",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/companyHistory/getAllCompanyHistory?companyId=${id}`
    );
    return response.data;
  }
);

export const getAllCompanyFormForMultipleServices = createAsyncThunk(
  "getAllCompanyFormForMultipleServices",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllCompanyFormByStatusAndCompany?status=${data?.status}&userId=${data?.userId}&page=${data?.page}&size=${data?.size}`
    );
    return response.data;
  }
);

export const updateMultiCompanyFormStatus = createAsyncThunk(
  "updateMultiCompanyFormStatus",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/company/updateMultiCompanyFormStatus`,
      data
    );
    return response.data;
  }
);

export const searchFormCompaniesBy = createAsyncThunk(
  "searchFormCompaniesBy",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/company/searchCompanyFormDataCompanywise?searchNameAndGSt=${data?.inputText}&userId=${data?.userId}&status=${data?.status}`
    );
    return response.data;
  }
);

export const getAllTempCompanies = createAsyncThunk(
  "getAllTempCompanies",
  async ({ id, page, filterUserId, size }) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllTempCompany?userId=${id}&filterUserId=${filterUserId}&page=${page}&size=${size}`
    );
    return response.data;
  }
);

export const updateMultiTempCompanyAssignee = createAsyncThunk(
  "updateMultiTempCompanyAssignee",
  async (data) => {
    const response = await putQuery(
      `/leadService/api/v1/company/updateMultiCompanyTempAssignee`,
      data
    );
    return response.data;
  }
);

export const deleteTempAssignee = createAsyncThunk(
  "deleteTempAssignee",
  async (data) => {
    const response = await deleteQueryWithData(
      `/leadService/api/v1/company/deleteTempAssignee`,
      data
    );
    return response.data;
  }
);

export const getAllConsultantByCompany = createAsyncThunk(
  "getAllConsultantByCompany",
  async (data) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllConsultantByCompany?userId=${data?.id}&filterUserId=${data?.filterUserId}&page=${data?.page}&size=${data?.size}`
    );
    return response.data;
  }
);

export const getAllConsultantByCompanyCount = createAsyncThunk(
  "getAllConsultantByCompanyCount",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/company/getAllConsultantByCompanyCount?userId=${id}`
    );
    return response.data;
  }
);

const CompnaySlice = createSlice({
  name: "company",
  initialState: {
    allCompnay: [],
    loadingCompany: false,
    errorCompany: false,
    compProject: [],
    compProjectLoading: false,
    compProjectError: false,
    compLeads: [],
    compLeadsLoading: false,
    compLeadsError: false,
    allCompany: [],
    loading: "",
    allParentCompany: [],
    allLeadCompanyList: [],
    allCompanyUnits: [],
    companyDetail: {},
    page: 0,
    companyHistoryList: [],
    companyListWithServices: {},
    totalCompanyServiceCount: 0,
    allTemporaryCompanies: [],
    consultantCompanyList: [],
    consultantLoading: "",
    consultantCompanyCount: 0,
  },
  reducers: {
    handleNextPagination: (state, action) => {
      state.page = state.page + 1;
    },
    handlePrevPagination: (state, action) => {
      state.page = state.page >= 0 ? state.page - 1 : 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyAction.pending, (state, action) => {
      state.loadingCompany = true;
      state.errorCompany = false;
    });
    builder.addCase(getCompanyAction.fulfilled, (state, action) => {
      state.allCompnay = action.payload;
      state.loadingCompany = false;
      state.errorCompany = false;
    });
    builder.addCase(getCompanyAction.rejected, (state, action) => {
      state.errorCompany = true;
      state.loadingCompany = false;
    });

    builder.addCase(getCompanyProjectAction.pending, (state, action) => {
      state.compProjectLoading = true;
      state.compProjectError = false;
    });
    builder.addCase(getCompanyProjectAction.fulfilled, (state, action) => {
      state.compProject = action.payload;
      state.compProjectLoading = false;
      state.compProjectError = false;
    });
    builder.addCase(getCompanyProjectAction.rejected, (state, action) => {
      state.compProjectError = true;
      state.compProjectLoading = false;
    });

    builder.addCase(getCompanyLeadsAction.pending, (state, action) => {
      state.compLeadsLoading = true;
      state.compLeadsError = false;
    });
    builder.addCase(getCompanyLeadsAction.fulfilled, (state, action) => {
      state.compLeads = action.payload;
      state.compLeadsLoading = false;
      state.compLeadsError = false;
    });
    builder.addCase(getCompanyLeadsAction.rejected, (state, action) => {
      state.compLeadsError = true;
      state.compLeadsLoading = false;
    });

    builder.addCase(getAllComapany.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllComapany.fulfilled, (state, action) => {
      state.allCompany = action.payload;
      state.loading = "success";
    });
    builder.addCase(getAllComapany.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getAllParentCompany.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllParentCompany.fulfilled, (state, action) => {
      state.allParentCompany = action.payload;
      state.loading = "success";
    });
    builder.addCase(getAllParentCompany.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getAllLeadCompanyies.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllLeadCompanyies.fulfilled, (state, action) => {
      state.allLeadCompanyList = action.payload;
      state.loading = "success";
    });
    builder.addCase(getAllLeadCompanyies.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getAllCompanyByStatus.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCompanyByStatus.fulfilled, (state, action) => {
      state.allLeadCompanyList = action.payload;
      state.loading = "success";
    });
    builder.addCase(getAllCompanyByStatus.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getAllCompanyUnits.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllCompanyUnits.fulfilled, (state, action) => {
      state.allCompanyUnits = action.payload;
      state.loading = "success";
    });
    builder.addCase(getAllCompanyUnits.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getCompanyDetailsById.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getCompanyDetailsById.fulfilled, (state, action) => {
      state.companyDetail = action.payload;
      state.loading = "success";
    });
    builder.addCase(getCompanyDetailsById.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(searchCompany.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(searchCompany.fulfilled, (state, action) => {
      state.allCompnay = action.payload;
      state.loading = "success";
    });
    builder.addCase(searchCompany.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(searchCompanyForm.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(searchCompanyForm.fulfilled, (state, action) => {
      state.allLeadCompanyList = action.payload;
      state.loading = "success";
    });
    builder.addCase(searchCompanyForm.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(getHistoryByCompanyId.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getHistoryByCompanyId.fulfilled, (state, action) => {
      state.companyHistoryList = action.payload;
      state.loading = "success";
    });
    builder.addCase(getHistoryByCompanyId.rejected, (state, action) => {
      state.loading = "rejected";
    });

    builder.addCase(
      getAllCompanyFormForMultipleServices.pending,
      (state, action) => {
        state.loading = "pending";
      }
    );
    builder.addCase(
      getAllCompanyFormForMultipleServices.fulfilled,
      (state, action) => {
        state.companyListWithServices = action.payload.data;
        state.totalCompanyServiceCount = action.payload.count;
        state.loading = "success";
      }
    );
    builder.addCase(
      getAllCompanyFormForMultipleServices.rejected,
      (state, action) => {
        state.loading = "rejected";
      }
    );

    builder.addCase(searchFormCompaniesBy.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(searchFormCompaniesBy.fulfilled, (state, action) => {
      state.companyListWithServices = action.payload;
      state.loading = "success";
    });
    builder.addCase(searchFormCompaniesBy.rejected, (state, action) => {
      state.loading = "rejected";
      state.companyListWithServices = {};
    });

    builder.addCase(getAllTempCompanies.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllTempCompanies.fulfilled, (state, action) => {
      state.allTemporaryCompanies = action.payload;
      state.loading = "success";
    });
    builder.addCase(getAllTempCompanies.rejected, (state, action) => {
      state.loading = "rejected";
      state.allTemporaryCompanies = [];
    });

    builder.addCase(getAllConsultantByCompany.pending, (state, action) => {
      state.consultantLoading = "pending";
    });
    builder.addCase(getAllConsultantByCompany.fulfilled, (state, action) => {
      state.consultantCompanyList = action.payload;
      state.consultantLoading = "success";
    });
    builder.addCase(getAllConsultantByCompany.rejected, (state, action) => {
      state.consultantLoading = "rejected";
      state.consultantCompanyList = [];
    });

    builder.addCase(getAllConsultantByCompanyCount.pending, (state, action) => {
      state.consultantLoading = "pending";
    });
    builder.addCase(
      getAllConsultantByCompanyCount.fulfilled,
      (state, action) => {
        state.consultantCompanyCount = action.payload;
        state.consultantLoading = "success";
      }
    );
    builder.addCase(
      getAllConsultantByCompanyCount.rejected,
      (state, action) => {
        state.consultantLoading = "rejected";
        state.consultantCompanyCount = 0;
      }
    );
  },
});

export const { handleNextPagination, handlePrevPagination } =
  CompnaySlice.actions;

export default CompnaySlice.reducer;
