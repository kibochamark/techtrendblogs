import { configureStore } from '@reduxjs/toolkit'
import { DialogReducer } from './slices/HandleDialogSlice'
import { DashReducer } from './slices/DashboardSlice'
// ...

export const store = configureStore({
  reducer: {
    handleaddedit:DialogReducer,
    dashboard:DashReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch