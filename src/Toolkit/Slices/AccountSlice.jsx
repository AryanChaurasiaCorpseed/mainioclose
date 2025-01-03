import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postQuery } from "../../API/PostQuery";
import { getQuery } from "../../API/GetQuery";
import { putQuery } from "../../API/PutQuery";

export const createVoucherType = createAsyncThunk(
  "createVoucherType",
  async ({ name }) => {
    const response = await postQuery(
      `/accountService/api/v1/voucherType/createVoucherType?name=${name}`
    );
    return response.data;
  }
);

export const getAllVoucherType = createAsyncThunk(
  "getAllVoucherType",
  async () => {
    const response = await getQuery(
      `/accountService/api/v1/voucherType/getAllVoucherType`
    );
    return response.data;
  }
);

export const updateVouchersType = createAsyncThunk(
  "updateVouchersType",
  async ({ name, id }) => {
    const response = await putQuery(
      `/accountService/api/v1/voucherType/updateVoucherType?name=${name}&id=${id}`
    );
    return response.data;
  }
);

export const createLedgerType = createAsyncThunk(
  "createLedgerType",
  async (data) => {
    const response = await postQuery(
      `/accountService/api/v1/ledgerType/createLedgerType`,
      data
    );
    return response.data;
  }
);

export const updateLedgerType = createAsyncThunk(
  "updateLedgerType",
  async (data) => {
    const response = await putQuery(
      `/accountService/api/v1/ledgerType/updateLedgerType`,
      data
    );
    return response.data;
  }
);

export const getAllLedgerType = createAsyncThunk(
  "getAllLedgerType",
  async () => {
    const response = await getQuery(
      `/accountService/api/v1/ledgerType/getAllLedgerType`
    );
    return response.data;
  }
);

export const createLedger = createAsyncThunk("createLedger", async (data) => {
  const response = await postQuery(
    `/accountService/api/v1/ledger/createLedger`,
    data
  );
  return response.data;
});

export const updateLedger = createAsyncThunk("updateLedger", async () => {
  const response = await putQuery(``);
  return response.data;
});

export const getAllLedger = createAsyncThunk("getAllLedger", async () => {
  const response = await getQuery(`/accountService/api/v1/ledger/getAllLedger`);
  return response.data;
});

export const getLedgerTypeById = createAsyncThunk(
  "getLedgerTypeById",
  async (id) => {
    const response = await getQuery(
      `/accountService/api/v1/ledgerType/getAllLedgerTypeById?id=${id}`
    );
    return response.data;
  }
);

export const getLedgerById = createAsyncThunk("getLedgerById", async (id) => {
  const response = await getQuery(
    `/accountService/api/v1/ledger/getLedgerById?id=${id}`
  );
  return response.data;
});

export const createStatutory = createAsyncThunk(
  "createStatutory",
  async (data) => {
    const response = await postQuery(
      `/accountService/api/v1/statutory/addStatutoryDetails`,
      data
    );
    return response.data;
  }
);

export const getAllStatutoryList = createAsyncThunk(
  "getAllStatutoryList",
  async (id) => {
    const response = await getQuery(
      `/accountService/api/v1/statutory/getAllStatutoryDetails?currentUserId=${id}`
    );
    return response.data;
  }
);

export const getStatutoryItemDetail = createAsyncThunk(
  "getStatutoryItemDetail",
  async (id) => {
    const response = await getQuery(
      `/accountService/api/v1/statutory/getStatutoryDetails?id=${id}`
    );
    return response.data;
  }
);

export const updateStatutory = createAsyncThunk(
  "updateStatutory",
  async (data) => {
    const response = await putQuery(
      `/accountService/api/v1/statutory/updateStatutoryDetails`,
      data
    );
    return response.data;
  }
);

export const getAllVoucher = createAsyncThunk("getAllVoucher", async () => {
  const response = await getQuery(
    `/accountService/api/v1/voucher/getAllVoucher`
  );
  return response.data;
});

export const createVoucher = createAsyncThunk("createVoucher", async (data) => {
  const response = await postQuery(
    `/accountService/api/v1/voucher/createVoucher`,
    data
  );
  return response.data;
});

// export const updateVoucher=createAsyncThunk('updateVoucher',async()=>{
//   const response=await putQuery(``)
// })

export const getAllOrganizations = createAsyncThunk(
  "getAllOrganizations",
  async () => {
    const response = await getQuery(
      `/accountService/api/v1/organization/getAllOrganization`
    );
    return response.data;
  }
);

export const getOrganizationByName = createAsyncThunk(
  "getOrganizationByName",
  async (name) => {
    const response = await getQuery(
      `/accountService/api/v1/organization/getAllOrganizationByName?name=${name}`
    );
    return response.data;
  }
);

export const createOrganization = createAsyncThunk(
  "createOrganization",
  async (data) => {
    const response = await postQuery(
      `/accountService/api/v1/organization/createOrganization`,
      data
    );
    return response.data;
  }
);

export const getAllDailyBookRecord = createAsyncThunk(
  "getAllDailyBookRecord",
  async ({ startDate, endDate }) => {
    const response = await getQuery(
      `/accountService/api/v1/voucher/getAllVoucherInBetweenDate?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  }
);

const AccountSlice = createSlice({
  name: "account",
  initialState: {
    voucherTypeLoading: "",
    voucherTypeList: [],
    ledgerTypeLoading: "",
    ledgerTypeList: [],
    ledgerLoading: "",
    ledgerList: [],
    voucherLoading: "",
    voucherList: [],
    loading: "",
    ledgerDetail: {},
    organiztionList: [],
    statutoryList: [],
    statutoryDetail: {},
    dailybookList: [],
    organizationDetail: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAllVoucherType.pending, (state, action) => {
      state.voucherTypeLoading = "pending";
    });
    builder.addCase(getAllVoucherType.fulfilled, (state, action) => {
      state.voucherTypeLoading = "success";
      state.voucherTypeList = action.payload;
    });
    builder.addCase(getAllVoucherType.rejected, (state, action) => {
      state.voucherTypeLoading = "rejected";
      state.voucherTypeList = [];
    });

    builder.addCase(getAllLedgerType.pending, (state, action) => {
      state.ledgerTypeLoading = "pending";
    });
    builder.addCase(getAllLedgerType.fulfilled, (state, action) => {
      state.ledgerTypeLoading = "success";
      state.ledgerTypeList = action.payload;
    });
    builder.addCase(getAllLedgerType.rejected, (state, action) => {
      state.ledgerTypeLoading = "rejected";
      state.ledgerTypeList = [];
    });

    builder.addCase(getAllLedger.pending, (state, action) => {
      state.ledgerLoading = "pending";
    });
    builder.addCase(getAllLedger.fulfilled, (state, action) => {
      state.ledgerLoading = "success";
      state.ledgerList = action.payload;
    });
    builder.addCase(getAllLedger.rejected, (state, action) => {
      state.ledgerLoading = "rejected";
      state.ledgerList = [];
    });

    builder.addCase(getAllVoucher.pending, (state, action) => {
      state.voucherLoading = "pending";
    });
    builder.addCase(getAllVoucher.fulfilled, (state, action) => {
      state.voucherLoading = "success";
      state.voucherList = action.payload;
    });
    builder.addCase(getAllVoucher.rejected, (state, action) => {
      state.voucherLoading = "rejected";
      state.voucherList = [];
    });

    builder.addCase(getLedgerById.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getLedgerById.fulfilled, (state, action) => {
      state.loading = "success";
      state.ledgerDetail = action.payload;
    });
    builder.addCase(getLedgerById.rejected, (state, action) => {
      state.loading = "rejected";
      state.ledgerDetail = {};
    });

    builder.addCase(getAllStatutoryList.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllStatutoryList.fulfilled, (state, action) => {
      state.loading = "success";
      state.statutoryList = action.payload;
    });
    builder.addCase(getAllStatutoryList.rejected, (state, action) => {
      state.loading = "rejected";
      state.statutoryList = [];
    });

    builder.addCase(getAllOrganizations.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllOrganizations.fulfilled, (state, action) => {
      state.loading = "success";
      state.organiztionList = action.payload;
    });
    builder.addCase(getAllOrganizations.rejected, (state, action) => {
      state.loading = "rejected";
      state.organiztionList = [];
    });

    builder.addCase(getStatutoryItemDetail.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getStatutoryItemDetail.fulfilled, (state, action) => {
      state.loading = "success";
      state.statutoryDetail = action.payload;
    });
    builder.addCase(getStatutoryItemDetail.rejected, (state, action) => {
      state.loading = "rejected";
      state.statutoryDetail = [];
    });

    builder.addCase(getAllDailyBookRecord.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getAllDailyBookRecord.fulfilled, (state, action) => {
      state.loading = "success";
      state.dailybookList = action.payload;
    });
    builder.addCase(getAllDailyBookRecord.rejected, (state, action) => {
      state.loading = "rejected";
      state.dailybookList = [];
    });

    builder.addCase(getOrganizationByName.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(getOrganizationByName.fulfilled, (state, action) => {
      state.loading = "success";
      state.organizationDetail = action.payload;
    });
    builder.addCase(getOrganizationByName.rejected, (state, action) => {
      state.loading = "rejected";
      state.organizationDetail = {};
    });
  },
});

export default AccountSlice.reducer;
