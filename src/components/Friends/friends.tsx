import React, { useEffect, useState } from 'react';
import './friends.scss';
import { getFriendsAsynk, setSearchType } from '../../redux/reducers/users';
import {ReactComponent as Arrow} from './../../assets/arrow-square-down.svg';
import loading from './../../assets/loading.gif'
import Friend from './friend';
import FriendsInfo from './friendsInfo';
import WithAuth from '../../hoc/withAuthHok';
import { UsersHeadLoading, UsersLoading } from '../LoaudingsComponents/users/usersLoading';
import './friend.scss';
import { userType, UseTypedDispatch, UseTypedSelector } from '../../@types/types';


const Friends = () => {

    const friends = UseTypedSelector((state) => state.UsersData.friends);
    const friendsTotal = UseTypedSelector((state) => state.UsersData.friendsTotal);
    const isloading = UseTypedSelector((state) => state.UsersData.loading);
    const searchType = UseTypedSelector(state => state.UsersData.searchType);
    const searching = UseTypedSelector((state) => state.UsersData.searching);
    const searchValue = UseTypedSelector(state => state.UsersData.searchValue);
    const [page, setpage] = useState<number>(2);

    const dispatch = UseTypedDispatch();
    
    const getMoreFriends = () => {
        if(searchType === 'followings' && searchValue) {
            dispatch(getFriendsAsynk({page: page, searchValue: searchValue}));
            setpage(page + 1)
        } else {
            dispatch(getFriendsAsynk({page: page}))
            setpage(page + 1)
        }
    }

    useEffect(() => {
        if((!searchType && searchValue) || (!searchType && !searchValue)){
            dispatch(getFriendsAsynk())
        } else {
            dispatch(setSearchType('followings'))
            dispatch(getFriendsAsynk({searchValue: searchValue}))
        }
    }, []);

    return (
        <div className='friends'>
            {
                friends.length || searchValue ?
                <FriendsInfo value={searchValue} totalCount={friendsTotal} withNopagination={false}/>:
                <UsersHeadLoading pagination={false}/>
            }
            <div className='friends_block'>
                {
                    friends.length || searchValue || searching? 
                            friends.length || searching?
                                friends.map((friend: userType) =>
                                    <Friend person={'friend'} key={friend.id} friend={friend} withNopagination={false}/>
                                ):
                                    !searchValue ?
                                    <div className='nousers'>there are no subscriptions, probably you should subscribe to someone</div>:
                                    <div className='nousers'>no matches found</div>:
                            <UsersLoading/>
                }
            </div>
            {friends.length === friendsTotal ? 
            "":
            <div>
                { !isloading && !searching ?
                    <div className="show_next" onClick={() => getMoreFriends()}>
                    <Arrow className='arrow'/>show more
                </div>:
                <div className="show_next">
                    <img src={loading} alt="just a sec" />just a sec
                </div>}
            </div>
            }
        </div>
    )
};


export default WithAuth(Friends);