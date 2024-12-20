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
  async ({ name, subLeadger, isDebitCredit, usedForCalculation }) => {
    const response = await postQuery(
      `/accountService/api/v1/ledgerType/createLedgerType?name=${name}&subLeadger=${subLeadger}&isDebitCredit=${isDebitCredit}&usedForCalculation=${usedForCalculation}`
    );
    return response.data;
  }
);

export const updateLedgerType = createAsyncThunk(
  "updateLedgerType",
  async ({ id, name, subLeadger, isDebitCredit, usedForCalculation }) => {
    const response = await putQuery(
      `/accountService/api/v1/ledgerType/updateLedgerType?id=${id}&name=${name}&subLeadger=${subLeadger}&isDebitCredit=${isDebitCredit}&usedForCalculation=${usedForCalculation}`
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
  },
});

export default AccountSlice.reducer;
