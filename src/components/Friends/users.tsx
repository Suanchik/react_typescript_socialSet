import React, { useEffect} from 'react';
import { getUsersAsynk, setSearchType } from '../../redux/reducers/users';
import User from './friend';
import FriendsInfo from './friendsInfo';
import './friend.scss';
import { UsersHeadLoading, UsersLoading } from '../LoaudingsComponents/users/usersLoading';
import { userType, UseTypedDispatch, UseTypedSelector } from '../../@types/types';


const Users = () => {

    const users = UseTypedSelector((state) => state.UsersData.users);
    const usersTotal = UseTypedSelector((state) => state.UsersData.usersTotal);
    const isloading = UseTypedSelector((state) => state.UsersData.loading);
    const searching = UseTypedSelector((state) => state.UsersData.searching);
    const value = UseTypedSelector(state => state.UsersData.searchValue);
    const searchType = UseTypedSelector(state => state.UsersData.searchType);

    const dispatch = UseTypedDispatch();
    
    useEffect(() => {
        if((!searchType && value) || (!searchType && !value)){
            dispatch(getUsersAsynk());
        } else {
            dispatch(getUsersAsynk({searchValue: value}));
            dispatch(setSearchType('users'))
        }
    }, []);

    return (
        <div className='friends'>
            {
                users.length || value?
                <FriendsInfo value={value} totalCount={usersTotal} withNopagination={true}/>:
                <div style={{marginBottom: '48px'}}>
                    <UsersHeadLoading pagination={true}/>
                </div>
            }
            <div className='friends_block'>
                {
                !isloading?
                users.length || searching? 
                searching ? 
                <UsersLoading/>:
                    users.map((user: userType)  =>
                        <User person={'user'} key={user.id} friend={user} withNopagination={true}/>
                    ):
                    <div className='nousers'>no matches found</div>:
                    <UsersLoading/>
                }
            </div>
        </div>
    )
};


export default Users;