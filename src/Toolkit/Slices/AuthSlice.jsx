import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postQuery } from "../../API/PostQuery";
import { getQuery } from "../../API/GetQuery";

export const getCurrentUser = createAsyncThunk("currentUser", async (data) => {
  const userData = await postQuery(`/securityService/api/auth/signin`, data);
  return userData?.data;
});

export const changePasswordAuthentication = createAsyncThunk(
  "changePassAuth",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/users/isManagerApproved?userId=${id}`
    );
    return response.data;
  }
);

export const getDepartmentOfUser = createAsyncThunk(
  "getDepartment",
  async (id) => {
    const response = await getQuery(
      `/leadService/api/v1/users/getSingleUserById?userId=${id}`
    );
    return response.data;
  }
);

export const createAuthDepartment = createAsyncThunk(
  "createDepartment",
  async (data) => {
    const response = await postQuery(
      `/securityService/api/department/createDepartment?name=${data?.name}`
    );
    return response;
  }
);

export const createAuthDesigination = createAsyncThunk(
  "createAuthDesignibnation",
  async (data) => {
    const response = await postQuery(
      `/securityService/api/designation/createDesignation?name=${data?.name}&weight=${data?.weight}`
    );
    return response;
  }
);

export const createDesiginationByDepartment = createAsyncThunk(
  "createDesiginationByDepartment",
  async (data) => {
    const response = await postQuery(
      `/securityService/api/department/createDepartmentInDesignation`,
      data
    );
    return response.data;
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loginLoading: false,
    currentUser: {},
    loginError: false,
    roles: [],
    jwt: "",
    isAuth: false,
    isManagerApproved: false,
    getDepartmentDetail: {},
    userLoading: "",
  },
  reducers: {
    logoutFun: (state, action) => {
      state.isAuth = false;
      state.currentUser = {};
      localStorage.removeItem("persist:root");
      localStorage.removeItem("userDetail");
      localStorage.clear();
      window.location.reload();
    },
    handleLoadingState: (state, action) => {
      state.userLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.loginLoading = true;
      state.loginError = false;
      state.userLoading = "pending";
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("userDetail", JSON.stringify(action.payload));
      state.jwt = action.payload.jwt;
      state.roles = action.payload.roles;
      state.loginLoading = false;
      state.isAuth = true;
      state.loginError = false;
      state.userLoading = "success";
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loginError = true;
      state.loginLoading = false;
      state.userLoading = "rejected";
    });

    builder.addCase(changePasswordAuthentication.pending, (state, action) => {
      state.loginLoading = true;
      state.loginError = false;
    });
    builder.addCase(changePasswordAuthentication.fulfilled, (state, action) => {
      state.isManagerApproved = action.payload;
    });
    builder.addCase(changePasswordAuthentication.rejected, (state, action) => {
      state.loginError = true;
    });

    builder.addCase(getDepartmentOfUser.pending, (state, action) => {
      state.loginLoading = true;
      state.loginError = false;
    });
    builder.addCase(getDepartmentOfUser.fulfilled, (state, action) => {
      state.getDepartmentDetail = action.payload;
    });
    builder.addCase(getDepartmentOfUser.rejected, (state, action) => {
      state.loginError = true;
    });
  },
});

export const { logoutFun, handleLoadingState } = AuthSlice.actions;
export default AuthSlice.reducer;
