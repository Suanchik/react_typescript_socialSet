import React from 'react';
import Following from '../following/following';
import Photo from './photo';
import ProfileStatus from './profileStatus';
import './profileImgStatus.scss';
import { profileType } from '../../@types/types';

type ProfileImgStatusProps = {
    openPhoto: () => void;
    profile: profileType; 
    userId: number | string,
    isfollowed: boolean | '', 
    status: string | ''
}

const ProfileImgStatus: React.FC<ProfileImgStatusProps> = ({openPhoto, profile, userId, isfollowed, status}) => {

    return (
        <div className='profileImgStatus'>
            <div className='photoName'>
            <div className='name'>{profile.fullName}</div>
                <Photo openPhoto={openPhoto} profile={profile} userId={+userId}/>
                <div style={{height: '50px'}}>
                {
                userId?
                    <Following person={'friend'} followed={isfollowed} id={profile.userId} isitProfile={true}/>:
                    <div className="yourProfile">your profile</div>
                }
            </div>
            </div>
            <ProfileStatus status={status} userId={userId} followed={isfollowed}/>
        </div>
    )
};

export default ProfileImgStatus;