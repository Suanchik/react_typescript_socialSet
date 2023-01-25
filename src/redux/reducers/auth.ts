import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { loginResponsType } from '../../@types/types';
import { AuthAPI } from '../../api/api';

export const authAsync = createAsyncThunk(
    'auth/auth',
    async function() {
        const res = await AuthAPI.Auth();
        if(res.data.resultCode === 0) {
            return {data: res.data, isAuth: true}
        } else {
            return {data: res.data, isAuth: false}
        }
    }
);

export const logOutAsync = createAsyncThunk(
    'auth/logOut',
    async function(_, {dispatch}) {
        const res = await AuthAPI.Logout();
        dispatch(authAsync())
        return res.data
    }
);

export const getCapchaAsync = createAsyncThunk(
    'auth/getCapcha',
    async function() {
        const res = await AuthAPI.getCaptcha();
        return res.data
    }
);

export const logInAsync = createAsyncThunk(
    'auth/logIn',
    async function(data: {email: string, password: string, captcha: string | null}, {dispatch}) {
        const res = await AuthAPI.Login(data.email, data.password, false,  data.captcha);
        if(res.data.resultCode === 1) {
            return res.data
        } else if(res.data.resultCode === 10) {
            dispatch(getCapchaAsync())
            return res.data
        } else {
            dispatch(authAsync())
        }
    }
);

const stateTypeObj = {
    isAuth: false as boolean,
    data: null as loginResponsType | null,
    loading: false as boolean,
    emailError: '' as string,
    captcha: '' as string
};

type stateType = typeof stateTypeObj;

const initialState: stateType = {
    isAuth: false,
    data: null,
    loading: false,
    emailError: '',
    captcha: ''
}

const authState = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(authAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authAsync.fulfilled, (state, action: PayloadAction<{data: loginResponsType, isAuth: boolean}>) => {
            state.loading = false;
            state.data =  action.payload.data
            state.isAuth = action.payload.isAuth
        });
        builder.addCase(logInAsync.pending, (state) => {
            state.loading = true
        });
        builder.addCase(logInAsync.fulfilled, (state, action: PayloadAction<loginResponsType>) => {
            if(action.payload){
                state.emailError = action.payload.messages[0];
                state.loading = false
            }
            state.loading = false
        });
        builder.addCase(getCapchaAsync.fulfilled, (state, action: PayloadAction<{url: string}>) => {
            state.captcha = action.payload.url
        });
    }
});

export default authState.reducer