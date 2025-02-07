import Cookies from 'js-cookie'
import axiosIns from '../config/axios'
import CryptoJS from 'crypto-js'
import { useEffect, useState } from 'react'
    
export function useAuth() {
    const [error, setError] = useState('')

    useEffect(() => {
        if (error != '') {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error])

    const isAuthenticated = () => { 
        return Cookies.get('user') != undefined 
    }

    const signin = async (user) => {
        try {
            const res = await axiosIns.post('/login', user)
            const jsonString = JSON.stringify(res.data)
            const encryptedJSON = CryptoJS.AES.encrypt(jsonString, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
            Cookies.set('user', encryptedJSON);
            return true
        } catch (error) {
            setError(error.response?.data.message)
            return false
        }
    }

    const logout = async () => {
        try {
            const res = await axiosIns.get('/logout');
            Cookies.remove('user')
            return true
        } catch (error) {
            setError(error.response?.data.message)
            return false
        }
    }

    const register = async (user) => {
        try {
            const res = await axiosIns.post('/register', user)
            const jsonString = JSON.stringify(res.data)
            const encryptedJSON = CryptoJS.AES.encrypt(jsonString, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
            Cookies.set('user', encryptedJSON);
            return true
        } catch (error) {
            setError(error.response?.data.message)
            return false
        }
    }

    return {
        signin,
        error,
        isAuthenticated,
        logout,
        register
    }
}



