import { photoType, profileType } from './../../@types/types';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { ProfileAPI } from '../../api/api';

export const getProfileAsynk = createAsyncThunk(
    'profile/getProfile',
    async function(id: number, {dispatch}) {
            const res = await ProfileAPI.getProfile(id);
            if(res.data?.userId) {
                dispatch(getStatusAsynk(res.data?.userId))
            }
            return res.data
    }
);

export const getStatusAsynk = createAsyncThunk(
    'profile/getStatus',
    async function(id: number) {
        const res = await ProfileAPI.getStatus(id);
        return res.data
    }
);

export const addProfileFormInfoAsync = createAsyncThunk(
    'profile/addForm',
    async function(profile: profileType, {dispatch, rejectWithValue}) {
        const res = await ProfileAPI.updateProfile(profile);
            if(res.data.resultCode === 0) {
                dispatch(getProfileAsynk(profile.userId));
                dispatch(openEdit(false))
            } else if(res.data.resultCode === 1){
                return rejectWithValue(res.data.messages[0])
            }
    }
);

export const addStatusFormInfoAsync = createAsyncThunk(
    'profile/addStatus',
    async function(status: string, {dispatch, getState}: {dispatch: any, getState: () => any}) {
            const { ProfileData } = getState();
            const res = await ProfileAPI.updateStatus(status);
            dispatch(getStatusAsynk(+ProfileData.profileId));
    }
);

export const addPhotoAsync = createAsyncThunk(
    'profile/savePhoto',
    async function(photo: string) {
            const res = await ProfileAPI.savePhoto(photo);
            const photos: photoType = res.data.data.photos
            return photos
    }
);

const stateTypeObj = {
    profileId: '' as string | number | '',
    profile: null as profileType | null,
    status: '' as string | '',
    statusloading: false as boolean,
    profileLoading: false as boolean,
    followed: '' as boolean | '',
    edit: false as boolean,
    error: '' as string
};

type stateType = typeof stateTypeObj;

const initialState: stateType = {
    profileId: '',
    profile: null,
    status: '',
    statusloading: false,
    profileLoading: false,
    followed: '',
    edit: false,
    error: ''
}


const profileState = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setFollowedToProfile(state, action) {
            state.followed = action.payload;
        },
        cleareErrors(state) {
            state.error = ''
        },
        openEdit(state, action) {
            state.edit = action.payload
        },
        isLoading(state, action) {
            state.profileLoading = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getProfileAsynk.pending, (state) => {
            state.profileLoading = true
        });
        builder.addCase(getProfileAsynk.fulfilled, (state, action: PayloadAction<profileType>) => {
            state.profile = action.payload;
            state.profileId = action.payload.userId;
        });
        builder.addCase(getStatusAsynk.pending, (state) => {
            state.statusloading = true
        });
        builder.addCase(getStatusAsynk.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = action.payload
            state.statusloading = false
        });
        builder.addCase(addProfileFormInfoAsync.rejected, (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        });
        builder.addCase(addStatusFormInfoAsync.pending, (state) => {
            state.statusloading = true
        });
        builder.addCase(addStatusFormInfoAsync.fulfilled, (state) => {
            state.statusloading = false
        });
        builder.addCase(addPhotoAsync.fulfilled, (state, action: PayloadAction<photoType>) => {
            if(state.profile){
                state.profile.photos = action.payload
            }
        });
    }
});

export const {setFollowedToProfile, cleareErrors, openEdit, isLoading} = profileState.actions
export default profileState.reducer;