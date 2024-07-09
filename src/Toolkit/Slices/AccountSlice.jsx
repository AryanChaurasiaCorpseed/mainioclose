import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postQuery } from "../../API/PostQuery";
import { getQuery } from "../../API/GetQuery";

 export const createCompany=createAsyncThunk('createCompany',async(data)=>{
    const response= await postQuery(`/leadService/api/v1/company/createCompany`,data)
    return response.data
})
export const getAllComapany=createAsyncThunk('getAllComapny',async(id)=>{
    const response =await getQuery(`/leadService/api/v1/company/getAllCompany?userId=${id}`)
    return response.data
})


const AccountSlice =createSlice({
    name:'account',
    initialState:{
        allCompany:[],
        loading:''

    },
    extraReducers:(builder)=>{
        builder.addCase(getAllComapany.pending,(state,action)=>{
            state.loading='pending'
        })
        builder.addCase(getAllComapany.fulfilled,(state,action)=>{
            state.allCompany=action.payload
            state.loading='success'
        })
        builder.addCase(getAllComapany.rejected,(state,action)=>{
            state.loading='rejected'
        })
    }
})

export default AccountSlice.reducer