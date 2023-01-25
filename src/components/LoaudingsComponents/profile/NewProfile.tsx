import React from 'react';
import './NewProfile.scss'

const NewProfile= () => {
    return (
        <div className='loadingProfile'>
            <div className="imgname">
                <div className='nameloading'>
                    <div className='name'></div>
                </div>
                <div className='img'></div>
                <div className="button"></div>
                <div className="statusHead"></div>
                <div className='status'>
                    <div className="statusText"></div>
                </div>
            </div>
            <div className="profileInfo">
                <div className='instruction'>
                    <div className="instructionInfo"></div>
                </div>
                <div className="mainInfo">
                <div className='items'>
                        <span className='discription'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                    <div className='items'>
                        <span className='discription two'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                    <div className='items'>
                        <span className='discription three'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                </div>
                <div className='instruction'>
                    <div className="instructionInfo"></div>
                </div>
                <div className="mainInfo bigger">
                    <div className='items'>
                        <span className='discription'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                    <div className='items'>
                        <span className='discription'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                    <div className='items'>
                        <span className='discription'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                    <div className='items'>
                        <span className='discription'>
                        </span>
                        <span className='serverloading'>
                            <span></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NewProfile;