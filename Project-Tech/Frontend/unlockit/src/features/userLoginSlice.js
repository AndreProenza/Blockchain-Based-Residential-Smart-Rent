import { createSlice } from '@reduxjs/toolkit'

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        id: "",
    },
    reducers: {
        setUserLogin: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
        setUserLoginId: (state, action) => {
            state.id = action.payload;
        },
    },
})

export const { setUserLogin, setUserLoginId } = userLoginSlice.actions

export default userLoginSlice.reducer