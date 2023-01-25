import axios from 'axios';
import { profileType } from '../@types/types';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'ef8a4b9c-1df0-4c77-aba0-118c4d1a37cf'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
});

export const UsersAPI = {
    getUsers (Page: number | null = 1, searchValue = '') {
        return instance.get(`users?page=${Page}&count=20&term=${searchValue}`)},
    UnFollow (id: number) {
        return instance.delete(`follow/${id}`)
    },
    Follow (id: number) {
        return instance.post(`follow/${id}`)
    },
    getFriends (page: number | null = 1, searchValue = '') {
        return instance.get(`users?page=${page}&count=20&friend=true&term=${searchValue}`)
    }
};


export const ProfileAPI = {
    getStatus(peopleID: number) {
        return instance.get(`profile/status/${peopleID}`)
    },
    getProfile(peopleID: number) {
        return instance.get(`profile/${peopleID}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status/`, {status: status})
    },
    updateProfile(profile: profileType) {
        return instance.put(`profile/`, profile)
    },
    savePhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};

export const AuthAPI = {
    Auth() {
        return instance.get(`auth/me`)
    },
    Login (email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    Logout () {
        return instance.delete(`auth/login`)
    },
    getCaptcha () {
        return instance.delete(`security/get-captcha-url`)
    }
};