import React from 'react';
import { NavLink } from 'react-router-dom';
import { UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import { logOutAsync } from '../../redux/reducers/auth';
import snicon from './../../assets/letter-s.png';
import './header.scss';
import MySearch from './mySearch';

const Header = () => {

    const isAuth = UseTypedSelector(state => state.AuthData.isAuth);
    const loading = UseTypedSelector(state => state.AuthData.loading);

    const dispatch = UseTypedDispatch();

    return (
        <header className='header'>
            <h1>
                <img src={snicon} alt="snicon" />
                <span>ocialset</span>
                <MySearch/>
                {
                        loading ?
                        '':
                        <div className='loginOut'>
                            {
                            isAuth ? 
                            <span className='login' onClick={() => dispatch(logOutAsync())}>log out</span>: 
                            <span className='login'><NavLink to="/login">log in</NavLink></span>
                        }
                        </div>

                }
            </h1>
        </header>
    )
};


export default Header;