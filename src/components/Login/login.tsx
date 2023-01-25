import React from 'react';
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom';
import { UseTypedDispatch, UseTypedSelector } from '../../@types/types';
import { logInAsync } from '../../redux/reducers/auth';
import InputLogin from './inputLogin';
import loadingImg from './../../assets/loading.gif'
import './login.scss'


const Login = () => {

    const dispatch = UseTypedDispatch();
    const isAuth = UseTypedSelector(state => state.AuthData.isAuth);
    const emailError = UseTypedSelector(state => state.AuthData.emailError);
    const captcha = UseTypedSelector(state => state.AuthData.captcha);
    const loading = UseTypedSelector(state => state.AuthData.loading);

    type FormValues = {
        login: string;
        password: string;
        captcha?: string
    };

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<FormValues>({mode: 'onChange'});

    const addProfileFormInfo = (e: {login: string, password: string, captcha?: string}) => {
        const data = {
            email: e.login, 
            password: e.password, 
            captcha: e.captcha ? e.captcha : null
        }
        dispatch(logInAsync(data));
    };

    return (
        <>
            {
                isAuth ?
                <Navigate replace to="/" />:
                <div className='loginForm'>
                    <form onSubmit={handleSubmit(addProfileFormInfo)} className='forml'>
                        <h2>INITIALIZATION</h2>
                        <InputLogin errors={errors.login} register={register} name={'login'} type={'text'} placeholder={'login...'}/>
                        <InputLogin errors={errors.password} register={register} name={'password'} type={'password'} placeholder={'password...'}/>
                        {loading ? 
                        <div className='logining'>logining &nbsp; &nbsp; &nbsp;<img src={loadingImg} alt="loadingImg" /></div>:
                        <button>log in</button>
                        }
                        <div className='SreverError'>{emailError}</div>
                        { captcha ? 
                        <div className="captchaBlock">
                            <img src={captcha} alt="captcha" />
                            <input type="text" placeholder="captcha..." {...register('captcha')}/>
                        </div>
                        : ''}
                    </form>
                </div>
            }
        </>
    )
};


export default Login;