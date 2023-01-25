import React, { useEffect, useState } from 'react';
import './navBar.scss';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Home} from './../../assets/home.svg';
import {ReactComponent as Friends} from './../../assets/users.svg';
import {ReactComponent as Users} from './../../assets/users-alt.svg';
import axios from 'axios';
import { UseTypedSelector } from '../../@types/types';

const NavBar: React.FC = () => {

    const friendsTotal = UseTypedSelector((state) => state.UsersData.friendsTotal);
    const addToTotal = UseTypedSelector((state) => state.UsersData.addToTotal);
    const [friendsTotalCount, setFriendsTotalCount] = useState<null | number>(null);
    const [usersTotalCount, setUsersTotalCount] = useState<null | number>(null);
    const isAuth = UseTypedSelector(state => state.AuthData.isAuth);

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users`).then(response => {
            setUsersTotalCount(response.data.totalCount)
        })
    }, []);

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?friend=true`, {
            withCredentials: true,
            headers: {
                'API-KEY': 'ef8a4b9c-1df0-4c77-aba0-118c4d1a37cf'
            }
        }).then(response => {
            setFriendsTotalCount(response.data.totalCount)
        })
    }, [isAuth]);

    useEffect(() => {
        console.log(addToTotal)
        if(addToTotal.act === 'plus') {
            setFriendsTotalCount(friendsTotalCount ? friendsTotalCount + 1: friendsTotalCount)
        } else if(addToTotal.act === 'minus') {
            setFriendsTotalCount(friendsTotalCount ? friendsTotalCount - 1: friendsTotalCount)
        }
    }, [addToTotal])

    return (
        <nav className='nav'>
           <div className="link">
            <NavLink to='/'><Home className="icon"/>my profile</NavLink>
           </div>
           {/* <div className="link">
            <Envelope className="icon"/>
            <NavLink to='/messages'>messages</NavLink>
           </div> */}
           <div className="link">
            <NavLink to='/friends'><Users className="icon"/>my followings</NavLink>
            {isAuth && <span className='totalCount'>{friendsTotalCount?.toLocaleString()}</span>}
           </div>
           <div className="link">
            <NavLink to='/users'><Friends className="icon"/>users</NavLink>
            <span className='totalCount'>{usersTotalCount?.toLocaleString()}</span>
           </div>
        </nav>
    )
};


export default NavBar;