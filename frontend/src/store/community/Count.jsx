import { createSlice, configureStore, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux';


const CountSlice = createSlice({
    name: 'count',
    initialState: {
        postLikeCount: "",
        commentCount: "",
        myLike: null,
        commentMyLike: null,
        commentLikeCount: ""
    },
    reducers: {
        savePostLikeCount(state, action) {
            state.postLikeCount = action.payload.postLikeCount
         
        },
        saveCommentCount(state, action){
            state.commentCount = action.payload.commentCount
        },
        saveMyLike(state, action) {
            state.myLike = action.payload.myLike
        },
        savecommentMyLike(state, action) {
            state.commentMyLike = action.payload.commentMyLike
        },
        saveCommentLikeCount(state, action) {
            state.commentLikeCount = action.payload.commentLikeCount
        }
    }
});

export const CountActions = CountSlice.actions;
export const CountState = (state) =>state.depart;
export default CountSlice.reducer;