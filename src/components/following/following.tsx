import React, { useEffect, useState } from 'react';
import { UseTypedSelector, UseTypedDispatch } from '../../@types/types';
import { followingAsynk } from '../../redux/reducers/users';

type FollowingProps = {
    person: string, 
    followed: boolean | '', 
    isAuth?: boolean, 
    id: number, 
    isitProfile?: boolean
}

const Following: React.FC<FollowingProps> = ({person, followed, isAuth = true, id, isitProfile = false}) => {

    const followloading = UseTypedSelector(({UsersData}) => UsersData.followloading);
    const dispatch = UseTypedDispatch();

    const [isDisabledButton, setisDisabledButton] = useState<string | number>('');

    const unFollow = (id: number) => {
        setisDisabledButton(id)
        dispatch(followingAsynk({follow: false, id: id, isProfile: isitProfile, person}));
    };

    useEffect(() => {
        if(!followloading) {
            if(isDisabledButton) {
                setisDisabledButton('')
            }
        }
    },[followloading])

    const follow = (id: number) => {
        setisDisabledButton(id)
        dispatch(followingAsynk({follow: true, id: id, isProfile: isitProfile, person}));
    };

    const souldLogin =  () => {
        alert('you should log in to follow people')
    }

    return (
        <>
            {
                followed ?
                <div>
                    {
                    followloading && (+isDisabledButton === id) ? 
                    <button className='unfollow unfollowing'>unfollowing</button>:
                    <button 
                        className='unfollow' 
                        onClick={() => isAuth ? unFollow(id): souldLogin()}>
                            unfollow
                    </button>
                    }
                </div>:
                <div>
                {
                    followloading && (+isDisabledButton === id) ?
                    <button className='follow following'>following</button>:
                    <button 
                        className='follow' 
                        onClick={() => isAuth ? follow(id): souldLogin()}>follow</button>
                }
                </div>
            }
        </>
    )
};

export default Following;