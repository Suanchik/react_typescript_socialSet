import React, {useEffect} from 'react';
import glass from './../../assets/loupe.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import { addValueToSearch, getFriendsAsynk, getUsersAsynk, setIsShowingSearchInfo, setSearchType } from '../../redux/reducers/users';

const MySearch = () => {

    const isShowingSearchInfo = UseTypedSelector((state) => state.UsersData.isShowingSearchInfo);
    const navigate = useNavigate();
    const searchType = UseTypedSelector(state => state.UsersData.searchType);
    const value = UseTypedSelector(state => state.UsersData.searchValue);
    const location = useLocation();
    const dispatch = UseTypedDispatch();

const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addValueToSearch(e.target.value))
};

const clearAftersearch = () => {
    dispatch(setIsShowingSearchInfo(false))
    if(location.pathname.slice(1) === 'friends') {
        dispatch(getFriendsAsynk());
    } else if (location.pathname.slice(1) === 'users') {
        dispatch(getUsersAsynk());
    }
};

const searchByname = () => {
    if(value && searchType) {
        if(searchType === 'followings') {
            navigate('/friends')
            if(location.pathname.slice(1) === 'friends') {
                dispatch(getFriendsAsynk({searchValue: value}))
            }
        } else {
            navigate('/users');
            if(location.pathname.slice(1) === 'users') {
                dispatch(getUsersAsynk({searchValue: value}));
            }
        }
    }
};

useEffect(() => {
    if(!value && (location.pathname.slice(1) !== 'friends') && (location.pathname.slice(1) !== 'users')) {
        dispatch(setIsShowingSearchInfo(false))
    }
}, [value, location.pathname])

    return (
        <div className='search'>
            <div className='searchTypeWrapper'>
                {
                value ? <div className='searchType'>
                    <span 
                    className={searchType === 'followings' ? 'selectedType': ''}
                    onClick={() => dispatch(setSearchType('followings'))}
                    >
                        followings
                    </span>
                    <span
                    onClick={() => dispatch(setSearchType('users'))}
                    className={searchType === 'users' ? 'selectedType': ''}
                    >
                        users
                    </span>
                </div> :
                <div onClick={() => clearAftersearch()}>
                    {isShowingSearchInfo && <div className="allPeople">
                        all {location.pathname.slice(1)}
                    </div>}
                </div>
                }
            </div>
            <div className='searchHeader'>
                <img
                    onClick={() => searchByname()}
                    src={glass}
                    alt="glassicon" 
                    placeholder='searching...'
                />
                <input
                    type="text"
                    value={value}
                    placeholder='search by name... '
                    onChange={(e) => getValue(e)}
                />
            </div>
        </div>
    )
};

export default MySearch;