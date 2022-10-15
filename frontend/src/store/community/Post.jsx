import { createSlice, configureStore, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

const postSlice = createSlice({
    name: 'post',
    initialState: {
        
        postComBanInfo: "",
        postAnoInfo: "",
        postList: []
    },
    reducers: {
        saveNotice(state, action) {
            state.postComBanInfo = action.payload.commentCount;
        },
        savePost(state, action) {
            state.postAnoInfo = action.payload.postAnoInfo;
            state.postComBanInfo = action.payload.postComBanInfo;
        },
        savePostList(state, action) {
            state.postList = action.payload.postList;
        }
      
}});

export const postActions = postSlice.actions;
export const postState = (state) => state.post;
export default postSlice.reducer;