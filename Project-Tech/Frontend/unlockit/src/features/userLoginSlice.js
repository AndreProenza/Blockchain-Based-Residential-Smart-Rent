import { createSlice } from '@reduxjs/toolkit'

export const userLoginSlice = createSlice({
    name: 'userLogin',
    initialState: {
        value: {
            id: "",
            email: ""
        }
    },
    reducers: {
        setUserLogin: (state, action) => {
            // state.value = action.payload;
            state = { ...state, ...action.payload };
        },
    },
})

export const { setUserLogin } = userLoginSlice.actions

export default userLoginSlice.reducer