import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuery } from "../../API/GetQuery";
import { postQuery } from "../../API/PostQuery";


export const getAllCompliances=createAsyncThunk('getCompliances',async()=>{
    const response=await getQuery(`/leadService/api/v1/complianceDocumnets/getAllComplianceDocuments`)
    return response.data
})

export const uploadDocuments=createAsyncThunk(`uploadDocuments`,async(data)=>{
    const response=await postQuery(`/leadService/api/v1/complianceDocumnets/createDocuments`,data)
    return response.data
})

const complianceSlice=createSlice({
    name:'compliance',
    initialState:{
        allCompliance:[],
        complianceLoading:false,
        complianceError:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCompliances.pending,(state,action)=>{
            state.complianceLoading=true
        })
        builder.addCase(getAllCompliances.fulfilled,(state,action)=>{
            state.allCompliance=action.payload
            state.complianceLoading=false
            state.complianceError=false
        })
        builder.addCase(getAllCompliances.rejected,(state,action)=>{
            state.complianceLoading=true
        })
    }
})

// const {}=complianceSlice.actions

export default complianceSlice.reducer