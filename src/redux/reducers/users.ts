import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { followingType, userType } from '../../@types/types';
import { UsersAPI } from '../../api/api';
import { setFollowedToProfile } from './profile';

export const getFriendsAsynk = createAsyncThunk(
    'users/getFriends',
    async function(options: {searchValue?: string, page?: number} | undefined, {dispatch}) {
        if(options?.page && !options?.searchValue) {
            dispatch(isLoading(true))
            const res = await UsersAPI.getFriends(options.page);
            dispatch(isLoading(false))
            return [res.data.items, options.page, res.data.totalCount]
        } else if(!options?.searchValue && !options?.page) {
            dispatch(isLoading(true))
            const res = await UsersAPI.getFriends();
            dispatch(isLoading(false))
            return [res.data.items, null, res.data.totalCount]
        } else if(options?.searchValue) {
            dispatch(isSearching(true))
            const res = await UsersAPI.getFriends(options?.page, options?.searchValue);
            dispatch(isSearching(false))
            dispatch(setIsShowingSearchInfo(true))
            return [res.data.items, options?.page, res.data.totalCount];
        }
    }
);

export const getUsersAsynk = createAsyncThunk(
    'users/getUsers',
    async function(options: {searchValue?: string, page?: number} | undefined, {dispatch}) {
        if(!options?.searchValue) {
            dispatch(isLoading(true))
            const res = await UsersAPI.getUsers(options?.page);
            dispatch(isLoading(false))
            return [res.data.items, null, res.data.totalCount]
        } else {
            dispatch(isSearching(true));
            let res;
            if (options?.page) {
                res = await UsersAPI.getUsers(options?.page, options.searchValue);
            } else {
                res = await UsersAPI.getUsers(null, options.searchValue);
            }
            dispatch(isSearching(false))
            dispatch(setIsShowingSearchInfo(true))
            return [res.data.items, null, res.data.totalCount]
        }
    }
);



export const followingAsynk = createAsyncThunk(
    'users/following',
    async function(options: followingType, {dispatch}) {
        if(options.follow) {
            await UsersAPI.Follow(options.id);
            if(options.isProfile) {
                dispatch(setFollowedToProfile(options.follow))
            };
            dispatch(increaseFriendsTotal())
            return {follow: options.follow, id: options.id, person: options.person}
        } else {
            await UsersAPI.UnFollow(options.id);
            if(options.isProfile) {
                dispatch(setFollowedToProfile(options.follow))
            }
            dispatch(reduceFriendsTotal())
            return {follow: options.follow, id: options.id, person: options.person};
        }
    }
);

const stateTypeObj = {
    friends: [] as userType[],
    friendsTotal: 0 as number,
    users: [] as userType[],
    usersTotal: 0 as number | 0,
    loading: false as boolean,
    searching: false as boolean,
    followloading: false as boolean,
    error: '' as string,
    searchValue: '' as string | '',
    isShowingSearchInfo: false as boolean,
    searchType: '' as string | '',
    addToTotal: {act: ''} as {act: string} | {act: ''}
}

type stateType = typeof stateTypeObj

const initialState: stateType = {
    friends: [],
    friendsTotal: 0,
    users: [],
    usersTotal: 0,
    loading: false,
    searching: false,
    followloading: false,
    error: '',
    searchValue: '',
    isShowingSearchInfo: false,
    searchType: '',
    addToTotal: {act: ''}
}

const usersState = createSlice({
    name: 'users',
    initialState,
    reducers: {
        isLoading(state, action) {
            state.loading = action.payload;
        },
        isSearching(state, action) {
            state.searching = action.payload;
        },
        reduceFriendsTotal(state) {
            state.friendsTotal = state.friendsTotal - 1;
            state.addToTotal = {act: 'minus'}
        },
        increaseFriendsTotal(state) {
            state.friendsTotal = state.friendsTotal + 1;
            state.addToTotal = {act: 'plus'}
        },
        addValueToSearch(state, action) {
            state.searchValue = action.payload
        },
        setIsShowingSearchInfo(state, action) {
            state.isShowingSearchInfo = action.payload
        },
        setSearchType(state, action) {
            state.searchType = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getFriendsAsynk.fulfilled, (state, action) => {
            state.loading = false;
            typeof action.payload?.[1] === 'number' ? 
            state.friends = [...state.friends, ...action.payload[0]]:
            state.friends = [...action.payload?.[0]]
            ;
            state.error = '';
            state.friendsTotal = action.payload?.[2]

        });
        builder.addCase(getUsersAsynk.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload[0]
            state.error = '';
            state.usersTotal = action.payload[2]
        });
        builder.addCase(followingAsynk.pending, (state) => {
            state.followloading = true
        });
        builder.addCase(followingAsynk.fulfilled, (state, action: PayloadAction<{follow: boolean, id: number, person: string}>) => {
            if(action.payload.person == 'user') {
                 state.users = state.users.map(el => {
                    if(el.id === action.payload.id) {
                        return {
                            ...el,
                            followed: action.payload.follow
                        }
                    } else {
                        return el
                    }
                })
            } else {
                 state.friends = state.friends.map(el => {
                    if(el.id === action.payload.id) {
                        return {
                            ...el,
                            followed: action.payload.follow
                        }
                    } else {
                        return el
                    }
                })
            }
            state.followloading = false;
            state.error = '';
        });
    }
});

export default usersState.reducer;
export const {isLoading, setSearchType, setIsShowingSearchInfo, addValueToSearch, isSearching, increaseFriendsTotal, reduceFriendsTotal} = usersState.actions