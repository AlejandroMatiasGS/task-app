'use client'

import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState({})

    useEffect(() => {
        try {
            const userCookie = Cookies.get('user')
            const decryptedCookie = CryptoJS.AES.decrypt(userCookie, process.env.NEXT_PUBLIC_SECRET_KEY)
            const user = JSON.parse(decryptedCookie.toString(CryptoJS.enc.Utf8))
            setUser(user)
        }catch(e) { setUser(undefined) }
    }, [])

    return user
}