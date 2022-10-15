import { createSlice, configureStore, createAsyncThunk, createReducer } from '@reduxjs/toolkit'



const PostUpdDateSlice = createSlice({
    name: 'postUpdDate',
    initialState: {
        postUpdDate: ""
    },
    reducers: {
       
        savePostUpdDate(state, action){
          state.postUpdDate = action.payload.postUpdDate
        },
       
    }
});

export const postUpdDateActions = PostUpdDateSlice.actions;
export const postUpdDateState = (state) =>state.postUpddate;
export default PostUpdDateSlice.reducer;