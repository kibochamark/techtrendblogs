import { createSlice } from '@reduxjs/toolkit'
import { File } from 'buffer';

type DialogType={
    isedit:boolean;
    isadd:boolean;
    file:File | any;
    data:any
    deletedata:any;
    todelete:boolean;
}

const initialState:DialogType={
    isedit: false,
    data: {},
    isadd: false,
    file: "",
    deletedata:{},
    todelete:false
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    handleEdit:(state, action)=>{
        state.isedit = action.payload.edit
        state.data = action.payload.data
    },
    handleAdd:(state)=>{
        state.isadd = !state.isadd
    },
    handleFile:(state,action)=>{
        state.file = action.payload
    },
    handleDeleteData:(state, action)=>{
        state.todelete=!state.todelete
        state.deletedata = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { handleAdd, handleEdit, handleFile, handleDeleteData } = dialogSlice.actions

export const DialogReducer =dialogSlice.reducer