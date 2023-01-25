import React, { useEffect, useMemo, useState } from "react";
import { UseTypedDispatch, UseTypedSelector } from "../../@types/types";
import { getUsersAsynk } from "../../redux/reducers/users";
import {ReactComponent as Left} from './../../assets/left.svg';
import {ReactComponent as Right} from './../../assets/right.svg';
import './pagination.scss'

const Pagination: React.FC<{totalCount: number}> = ({totalCount}) => {

    const [pagesGroups, setpagesGroups] = useState([0, 10]);
    const [cutPages, setCutPages] = useState<number[]>([]);
    const searchType = UseTypedSelector((state) => state.UsersData.searchType);
    const searchValue = UseTypedSelector((state) => state.UsersData.searchValue);
    const [activePage, setActivePage] = useState(1);
    const dispatch = UseTypedDispatch();

    const pages = useMemo(() => {
        const countPages = Math.ceil(totalCount / 21);
        const userspages = [];
    
        for(let i = 1; countPages > i; i++) {
            userspages.push(i)
        };

        return userspages
    }, [totalCount])

    const next = () => {
        setpagesGroups([pagesGroups[0] + 10, pagesGroups[1] + 10])
        setActivePage(pagesGroups[0] + 10 + 1);
        if(searchType === 'users' && searchValue) {
            dispatch(getUsersAsynk({page: pagesGroups[0] + 10 + 1, searchValue: searchValue}))
        } else {
            dispatch(getUsersAsynk({page: pagesGroups[0] + 10 + 1}));
        }
    };

    const prev = () => {
        setpagesGroups([pagesGroups[0] - 10, pagesGroups[1] - 10])
        setActivePage(pagesGroups[0] - 10 + 1);
        if(searchType === 'users' && searchValue) {
            dispatch(getUsersAsynk({page: pagesGroups[0] - 10 + 1, searchValue: searchValue}))
        } else {
            dispatch(getUsersAsynk({page: pagesGroups[0] - 10 + 1}))
        }
    }
    
    useEffect(() => {
        setCutPages(pages.slice(pagesGroups[0],pagesGroups[1]))
    }, [pagesGroups, pages]);

    const getNewPage = (num: number) => {
        if(activePage !== num) {
            setActivePage(num);
            if(searchType === 'users' && searchValue) {
                dispatch(getUsersAsynk({page: num, searchValue: searchValue}))
            } else {
                dispatch(getUsersAsynk({page: num}))
            }
        }
    }

    return (
        <div className='pagination'>
            <div 
             onClick={() => pagesGroups[0] == 0 ? null: prev()}
            className={pagesGroups[0] == 0 ? 'disabled prev': 'prev'}
            >
                <Left className="left"/>
            </div>
            <div className="pagesBlock">
                {
                    cutPages.length ? 
                    cutPages.map(page => <div 
                        key={page} 
                        className={activePage === page ? 'active page':'page'} 
                        onClick={() => getNewPage(page)}>{page}</div>):
                    ''
                }
            </div>
            <div
            onClick={() => cutPages.length < 10 ? null : next()}
            className={cutPages.length < 10 ? 'disabled next': 'next'}
            >
                <Right className="right"/>
            </div>
        </div>
    )
};

export default Pagination;