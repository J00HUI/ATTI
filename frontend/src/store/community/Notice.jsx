import { createSlice, configureStore, createAsyncThunk, createReducer } from '@reduxjs/toolkit'

const noticeSlice = createSlice({
    name: 'notice',
    initialState: {
        commentCount: "",
        likeCount: "",
        myLike: "",
        postContent: "",
        postId: "",
        postRegDate: "",
        postTitle: "",
        userId: "",
        postList: []
    },
    reducers: {
        saveNotice(state, action) {
            state.commentCount = action.payload.commentCount;
            state.likeCount = action.payload.likeCount;
            state.myLike = action.payload.myLike;
            state.postContent = action.payload.postContent;
            state.postId = action.payload.postId;
            state.postRegDate = action.payload.postRegDate;
            state.postTitle = action.payload.postTitle;
            state.userId = action.payload.userId
        },
        savePostList(state, action) {
            state.postList = action.payload.postList
        }
}});

export const noticeActions = noticeSlice.actions;
export const noticeState = (state) => state.notice;
export default noticeSlice.reducer;