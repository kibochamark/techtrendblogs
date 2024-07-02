import { createSlice } from '@reduxjs/toolkit'
import { File } from 'buffer';

type DashType={
    isactive:boolean;
    active:"blogs" | "categories"
}

const initialState:DashType={
    isactive: true,
    active: 'blogs'
}


export const dashslice = createSlice({
  name: 'dash',
  initialState,
  reducers: {
    handleActiveTab:(state, action)=>{
        state.isactive = action.payload.isactive
        state.active = action.payload.active
    },
    
  }
})

// Action creators are generated for each case reducer function
export const { handleActiveTab } = dashslice.actions

export const DashReducer =dashslice.reducer