import { configureStore, createSlice } from "@reduxjs/toolkit"
const loadingState = {
    isLoading:false
}

const loadingSlice = createSlice({
    name:"Loading",
    initialState:loadingState,
    reducers: {
        setLoading(state,action){
            state.isLoading = action.payload
        },
    }
})

const store = configureStore({
    reducer:{
        loading:loadingSlice.reducer
    }
})

export const loadingactions = loadingSlice.actions

export default store