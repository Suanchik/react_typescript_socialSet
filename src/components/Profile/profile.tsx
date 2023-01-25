import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProfileAsynk, isLoading, openEdit } from '../../redux/reducers/profile';
import './profile.scss';
import * as qs from 'qs';
import ProfileForm from './profileForm';
import ProfileInfo from './profileInfo';
import WithAuth from '../../hoc/withAuthHok';
import NewProfile from '../LoaudingsComponents/profile/NewProfile';
import ProfileImgStatus from './profileImgStatus';
import { UseTypedDispatch, UseTypedSelector } from '../../@types/types';


const Profile = () => {

    const isAuth = UseTypedSelector(state => state.AuthData.isAuth);
    const profileId = UseTypedSelector(state => state.AuthData.data?.data.id);
    const profileBll = UseTypedSelector(state => state.ProfileData.profile);
    const edit = UseTypedSelector(state => state.ProfileData.edit);
    const status = UseTypedSelector(state => state.ProfileData.status);
    const isfollowed = UseTypedSelector(state => state.ProfileData.followed);
    const profileLoading = UseTypedSelector(state => state.ProfileData.profileLoading);
    const [profile, setprofile] = useState(profileBll);
    const [isShowed, setisShowed] = useState(false);
    const [isFinishedLoading, setIsFinishedLoading] = useState(false);
    const dispatch = UseTypedDispatch();
    const firstRender = useRef(false);
    const [followedFromSearch, setfollowedFromSearch] = useState<boolean>(qs.parse(window.location.search.substring(1)).followed === 'true' ? true: false)
    const novigate = useNavigate()

    const {userId} = useParams();

    useEffect(() => {
        if(firstRender.current){
            const querString = qs.stringify({
                followed: !followedFromSearch
            });
            novigate(`?${querString}`)
            setfollowedFromSearch(!followedFromSearch)
        };
        firstRender.current = true;
    }, [isfollowed]);

    useEffect(() => {
        if(isAuth) {
            if(userId) {
                dispatch(getProfileAsynk(+userId))
            } else if (profileId) {
                dispatch(getProfileAsynk(profileId))
            }
        }
    }, [userId]);

    useEffect(() => {
        if(isFinishedLoading) {
            dispatch(isLoading(false))
            setIsFinishedLoading(false)
        }
    },[profile])

    useEffect(() => {
        if(!userId || profile?.userId !== profileBll?.userId) {
            setprofile(profileBll)
            setIsFinishedLoading(true)
        }
    }, [profileBll]);

    useEffect(() => {
        if(edit) {
            dispatch(openEdit(false))
        }
    }, [])

    const openPhoto = () => {
        setisShowed(true)
    }

    return (
        <div>
            {
                !profileLoading && profile ?
                <div className='profile'>
                    {
                    isShowed ?
                    <div className="openedPhotoWindowBlock">
                        <div className='openedPhotoWindow'>
                            <div className='close' onClick={() => setisShowed(false)}>&#10006;</div>
                            <img src={profile.photos?.large ? profile.photos?.large: ''} alt="photoOpened" />
                        </div>
                    </div>:
                    null
                    } 
                    <ProfileImgStatus  
                    profile={profile} 
                    userId={userId ? userId : ''} 
                    isfollowed={followedFromSearch} 
                    status={status} 
                    openPhoto={openPhoto}/>
                    {
                    !edit ?
                    <ProfileInfo profile={profile} userId={userId ? userId: ''} />:
                    <ProfileForm profile={profile} profileId={profileId ? profileId : 0}/>
                    }
                </div>:
                <NewProfile />
            }
        </div>
    )
};


export default WithAuth(Profile);