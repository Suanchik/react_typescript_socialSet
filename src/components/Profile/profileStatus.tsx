import React, { useEffect, useState } from 'react';
import { UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import { addStatusFormInfoAsync } from '../../redux/reducers/profile';
import { cutTooLongString } from '../../utils/utils';
import loading from './../../assets/loading.gif';
import './status.scss'

type StatusProps = {
    status: string | '';
    userId: number | string; 
    followed: boolean | ''
}

const ProfileStatus: React.FC<StatusProps> = React.memo(({status, userId, followed}) => {

    const dispatch = UseTypedDispatch();
    const statusloading = UseTypedSelector((state) => state.ProfileData.statusloading)

    const [isAddingStatus, setisAddingStatus] = useState(false);
    const [mystatus, setmystatus] = useState<string | null>(null);
    const [value, setvalue] = useState('');

    useEffect(() => {
            setmystatus(status)
            setvalue(status)
        return () => {
            setmystatus(null)
        }
    }, [status])

    const addNewStatus = () => {
        dispatch(addStatusFormInfoAsync(value))
        setisAddingStatus(false)
    }

    return (
        <div className='statusBlock'>
            <div className="h4">status</div>
            {!isAddingStatus ?
            <div>
                <span 
                className='status' 
                title={!userId ? "on double click" : ""} 
                onDoubleClick={() => !userId ? setisAddingStatus(true): ''}
                >
                    {!statusloading ? 
                    <span>
                        {
                        mystatus ? 
                        cutTooLongString(mystatus, 185):
                        <div className='noStatus'>no status</div>
                        }
                    </span>:
                    <img src={loading} alt="loading" />
                    }
                </span>
            </div>:
            <div>
                <textarea className="statusInput" autoFocus onBlur={() => addNewStatus()} onChange={(e) => setvalue(e.target.value)} value={value}/>
            </div>
            }
        </div>
    )
});


export default ProfileStatus;