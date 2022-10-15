import { createSlice, configureStore, createAsyncThunk, createReducer } from '@reduxjs/toolkit'


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categoryId: 0,
        categoryAnoInfo: null,
        categoryComAnoInfo: null,
        categoryComInfo: null,
        categoryName: "공지사항",
        cType: null,
        departId: null,
        userId: null,
        categoryList: [],
        changeCss: 1,
        changeCss2: 1
    },
    reducers: {
        saveCategory(state, action) {
            console.log("리스트 아님",action);
            state.categoryId = action.payload.categoryId;
            state.categoryAnoInfo = action.payload.categoryAnoInfo;
            state.categoryComAnoInfo = action.payload.categoryComAnoInfo;
            state.categoryComInfo = action.payload.categoryComInfo;
            state.categoryName = action.payload.categoryName;
            state.cType = action.payload.cType;
            state.departId = action.payload.departId;
            state.userId = action.payload.userId;
        },
        saveCategoryList(state, action) {
            console.log("새로운 카테고리 리스트를 저장합니다.",action)
            state.categoryList = action.payload.categoryList;
        },
        saveCType(state, action){
            state.cType =  action.payload.cType
        },
        saveChangeCss(state, action) {
            state.changeCss = action.payload.changeCss
        },
        saveChangeCss2(state, action){
            state.changeCss2 = action.payload.changeCss2
        }
    }

});

const communityStore = configureStore({
    reducer: { 
        category: categorySlice.reducer,
        
    },
});


export const categoryActions = categorySlice.actions;
export const categoryState = (state) =>state.category;
export default categorySlice.reducer;
