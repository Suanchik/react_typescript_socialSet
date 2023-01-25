import React from 'react';
import Pagination from './pagination';
import './friendsInfo.scss';
import { UseTypedSelector } from '../../@types/types';

type FriendsInfoType = {
    totalCount: number;
    withNopagination: boolean;
    value: string;
}

const FriendsInfo: React.FC<FriendsInfoType> = ({totalCount, withNopagination, value}) => {

    const isShowingSearchInfo = UseTypedSelector((state) => state.UsersData.isShowingSearchInfo);
    const searching = UseTypedSelector((state) => state.UsersData.searching);
    const searchType = UseTypedSelector((state) => state.UsersData.searchType);
    
    return (
        <>
            <div className='friends_info'>
                <div className='count'>
                    {
                    totalCount ?
                    <span className='followings'>{totalCount.toLocaleString()} {!withNopagination ? 'followings': 'users'}</span>:
                    <span className='followings'>{searching ? '...': 0} {!withNopagination ? 'followings': 'users'}</span>
                    }
                </div>
                <div>
                    {withNopagination &&  totalCount > 20 ? <Pagination totalCount={totalCount}/>: ''}
                    {(totalCount > 1 && searchType !== '') && isShowingSearchInfo &&
                    <div className='explanation'>
                        Please, write a more specific name to find the one you are looking for
                    </div>}

                </div>
            </div>
        </>
    )
};

export default FriendsInfo;