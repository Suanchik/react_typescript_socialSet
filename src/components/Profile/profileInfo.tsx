import React, { useMemo, useState } from 'react';
import { profileType, UseTypedDispatch } from '../../@types/types';
import { openEdit } from '../../redux/reducers/profile';
import { cutTooLongString } from '../../utils/utils';
import nocontacts from './../../assets/search.png'
import './profileInfo.scss';

type InfoProps = {
    profile: profileType;
    userId: number | string
}

const ProfileInfo: React.FC<InfoProps> = ({profile, userId}) => {

    const [showPopap, setshowPopap] = useState(false);
    const dispatch = UseTypedDispatch();

    const newContacts = useMemo(() => {
        return Object.keys(profile?.contacts)?.filter((el: string) => profile.contacts[el as keyof typeof profile.contacts])
    }, [profile.contacts])

    return (
        <div className='profileInfo'>
            {
                !userId ?
                <div className="edit" 
                onClick={() => dispatch(openEdit(true))}
                >edit</div>:
                ''
            }
            <div className="mainInfo">
            <div className='instruction'>main information</div>
                <div className="mineInfo">
                    <div className='list_item'>
                        <span className='discription'><span>aboute me</span></span>
                        <span className='serverInfo' 
                            style={{cursor: profile.aboutMe?.length && profile.aboutMe?.length > 43 ? 'pointer': 'auto'}}
                            onMouseOver={() => setshowPopap(true)}
                            onMouseOut={() => setshowPopap(false)}
                            >
                                {profile.aboutMe ?
                                cutTooLongString(profile.aboutMe, 43):
                                <span className='noInfo'>no information available</span>}
                        </span>
                        {
                        profile.aboutMe?.length && profile.aboutMe?.length > 45 && showPopap ? 
                        <div className={"popap"}>
                            {profile.aboutMe}
                        </div>:
                        ''
                        }
                    </div>
                <div className='list_item'>
                    <span className='discription'><span>looking for a job</span></span>
                    {
                        profile.lookingForAJob ?
                        <span className='serverInfo'>yes</span>:
                        <span className='serverInfo'>no</span>
                    }
                </div>
                <div className='list_item'><span className='discription'>
                    <span>job discription</span>
                    </span>
                        <span
                        title={profile.lookingForAJobDescription?.length > 43 ? profile.lookingForAJobDescription: ''}
                        className='serverInfo'>
                        {profile.lookingForAJobDescription ?
                        cutTooLongString(profile.lookingForAJobDescription, 42):
                        <span className='noInfo'>no information available</span>
                }</span>
                </div>
            </div>
            </div>
            <div className='contacts'>
                <div className='instruction'>contacts of user</div>
                <div className="contactsInfo">
                <div>
                {
                    newContacts?.length ? newContacts.map((el: string) =>
                        <div key={el} className='list_item'>
                            <span className='discription'><span>{el}</span></span>
                            <span 
                            className='serverInfo'
                            title={profile.contacts[el as keyof typeof profile.contacts].length > 43 ? profile.contacts[el as keyof typeof profile.contacts]: ''}
                            >
                                {cutTooLongString(profile.contacts[el as keyof typeof profile.contacts], 43)}
                            </span>
                        </div>
                    ):
                    <div className='nocontacts'>
                        <img src={nocontacts} alt="nocontacts" />
                        <div>contacts are not specified</div>
                    </div>
                }
                </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileInfo;