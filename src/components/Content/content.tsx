import React from 'react';
import Profile from '../Profile/profile';
import Users from '../Friends/users';
import {Routes, Route} from 'react-router-dom'
import './content.scss'
import Friends from '../Friends/friends';
import Login from '../Login/login';


const Content: React.FC = () => {
    return (
        <div className='content'>
            <Routes>
                <Route path='/' element={<Profile/>}/>
                <Route path='/profile/:userId' element={<Profile/>}/>
                <Route path='/users' element={<Users/>}/>
                <Route path='/friends' element={<Friends/>}/>
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </div>
    )
};


export default Content;