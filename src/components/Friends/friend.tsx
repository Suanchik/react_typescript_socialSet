import React, { memo} from 'react';
import { useNavigate } from 'react-router-dom';
import { userType, UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import * as qs from 'qs';
import { cutTooLongString } from '../../utils/utils';
import Following from '../following/following';
import avatar from './../../assets/avatar.jpg'
import { addValueToSearch, setIsShowingSearchInfo } from '../../redux/reducers/users';

type UserProps = {
    friend: userType;
    withNopagination: boolean;
    person: string
}

const Friend: React.FC<UserProps> = memo(({friend, withNopagination, person}) => {

    const dispatch = UseTypedDispatch();
    const navigate = useNavigate()

    const isAuth = UseTypedSelector((state) => state.AuthData.isAuth);
    const isloading = UseTypedSelector((state) => state.UsersData.loading);

    const showprofile = (id: number, followed: boolean) => {
        const querString = qs.stringify({
            followed: followed
        });
        navigate('/profile/' + id + '?' + querString);
        dispatch(setIsShowingSearchInfo(false))
        dispatch(addValueToSearch(''))
    }

    return (
        <div className={isloading && withNopagination ? "friend loading" : "friend"}>
            <div className='imgButton'>
                <img onClick={() => showprofile(friend.id, friend.followed)} src={friend.photos.large ? friend.photos.large: avatar} alt="friend" />
                <Following person={person} followed={friend.followed} isAuth={isAuth} id={friend.id}/>
            </div>
            <div className='nameStatus'>
                <div className='name' onClick={() => showprofile(friend.id, friend.followed)}>{friend.name}</div>
                <div className='status'>{
                friend.status ? 
                cutTooLongString(friend.status, 80):
                <div style={{textAlign: 'center', opacity: 0.5}}>no status</div>
            }</div>
            </div>
        </div>
    )
});

export default Friend;