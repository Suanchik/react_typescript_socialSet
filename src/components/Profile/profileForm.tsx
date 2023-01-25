import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseTypedDispatch, UseTypedSelector, profileType } from '../../@types/types';
import { addProfileFormInfoAsync, cleareErrors, openEdit } from '../../redux/reducers/profile';
import './profileForm.scss'

type ProfileFormProps = {
    profile: profileType;
    profileId: number
}

const ProfileForm: React.FC<ProfileFormProps> = ({profile, profileId}) => {

    const error = UseTypedSelector(state => state.ProfileData.error);

    const [lookingForAJob, setlookingForAJob] = useState(profile.lookingForAJob)

    const dispatch = UseTypedDispatch();

    const {
        register,
        handleSubmit, 
        formState: {errors}
    } = useForm<any>({mode:'onChange'});

    useEffect(() => {
        if(error){
            dispatch(cleareErrors())
        }
    }, [])

    const addProfileFormInfo = (e: any) => {
        console.log('api')
        const profilFormObject = {
            userId: profileId,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: e.lookingForAJobDescription,
            fullName: e.fullName,
            aboutMe: e.aboutMe,
            contacts: {
                github: e.github,
                vk: e.vk,
                facebook: e.facebook,
                instagram: e.instagram,
                twitter: e.twitter,
                website: e.website,
                youtube: e.youtube,
                mainLink: e.mainLink
            }
        };
        dispatch(addProfileFormInfoAsync(profilFormObject))
    };

    return (
        <div className='form'>
            <div className='instruction'>each field must be filled in, at the request of the server</div>
            <div className="back" 
            onClick={() => dispatch(openEdit(false))}
            >go back</div>
            <label className='save' htmlFor='save'>save</label>
            <form onSubmit={handleSubmit(addProfileFormInfo)} className='profileForm'>
                <div className="mainInfo">
                <div className='form_item'>
                    <span><span className='blackSpan'>full name</span></span>
                    <input
                        placeholder={errors.fullName ? String(errors.fullName.message) : ''}
                        className={errors.fullName ? 'inputError' : 'input'}
                        {...register('fullName', {required: 'empty field', maxLength: 60, value: profile.fullName})}
                    />
                </div>
                <div className='form_item'>
                    <span><span className='blackSpan'>aboute me</span></span>
                    <textarea
                        placeholder={errors.aboutMe ? String(errors.aboutMe.message) : ''}
                        className={errors.aboutMe ? 'textareaError' : 'textarea'}
                        {...register('aboutMe', {required: 'empty field', maxLength: 100, value: profile.aboutMe})}
                    />
                </div>
                <div className='form_item'>
                    <span><span className='blackSpan'>looking for a job</span></span>
                    {
                        lookingForAJob ?
                        <span><span onClick={() => setlookingForAJob(false)} className='true serverInfo'>✓</span></span>:
                        <span><span onClick={() => setlookingForAJob(true)} className='false serverInfo'>✓</span></span>
                    }
                </div>
                <div className='form_item'>
                    <span><span className='blackSpan'>looking for a job description</span></span>
                    <textarea
                        placeholder={errors.lookingForAJobDescription ? String(errors.lookingForAJobDescription.message) : ''}
                        className={errors.lookingForAJobDescription ? 'textareaError' : 'textarea'}
                        {...register('lookingForAJobDescription', {required: 'empty field', maxLength: 100, value: profile.lookingForAJobDescription})}
                        />
                </div>
                </div>
                <div className='instruction'>each field must be filled in, with correct url</div>
                <div className="contacts">
                {
                    Object.keys(profile?.contacts)?.
                    map((el: string) => 
                    {
                    return <div key={el} className='form_item'>
                       <span><span className='blackSpan'>{el}</span></span>
                       <input 
                            type="text"  
                            {...register(`${el}`, {value: profile.contacts[el as keyof typeof profile.contacts]})}
                            // onChange={(e) => setprofileContactsValues({...profileContactsValues, [el]: e.target.value})}
                        />
                    </div>
                    }
                    )
                }
                <div className='error'>
                    {error ? error: ''}
                </div>
                </div>
                <button id='save' style={{display: 'none'}}>save</button>
            </form>
        </div>
    )
};


export default ProfileForm;