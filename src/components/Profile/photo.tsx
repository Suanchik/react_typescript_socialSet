import React from 'react';
import { profileType, UseTypedDispatch } from '../../@types/types';
import { addPhotoAsync } from '../../redux/reducers/profile';
import ava from './../../assets/avatar.jpg'
import glass from './../../assets/magnifying-glass.png';

type PhotoProps = {
    profile: profileType;
    userId: number;
    openPhoto: () => void
}

const Photo: React.FC<PhotoProps> = ({profile, userId, openPhoto}) => {

    const dispatch = UseTypedDispatch();

    const getFiles = (e: any) => {
        const photos: string[] = Array.from(e.target.files);
        dispatch(addPhotoAsync(photos[0]));
    }

    return (
        <div className='img'>
            {profile.photos?.large ?
            <div onClick={() => openPhoto()} className='glass'>
                <img src={glass} alt='glass'/>
            </div>:
             ''}
            <div>{<img className='ava' src={profile.photos?.large ? profile.photos?.large: ava} alt='userimg'/>}</div>
            {userId ? 
            '':
            <div className='addPhoto'>
                <input style={{display: 'none'}} type="file" id="file" onChange={e => getFiles(e)} />
                <label htmlFor="file">New photo</label>
            </div>}
        </div>
    )
};

export default Photo;