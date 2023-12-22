import AuthService from "api/services/AuthService";
import { useAppDispatch } from "app/hooks"
import { setAuth, setUser } from "features/user/userSlice";
import axios from "axios";
import { useState } from "react"
import { toast } from "react-toastify";
import { AuthResponse } from "models/response/AuthResponse";
import { API_URL } from "api/http";

export const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const [email, setInputEmail] = useState<string>('')
    const [password, setInputPassowrd] = useState<string>('')
    

    const handleLogin = async () => {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user))
            toast("Success Login", {
                type: "success"
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast(e.response?.data?.message, {
                type: "error"
            });
        }
    }

    const handleRegistration = async () => {
        try {
            const response = await AuthService.registration(email, password)
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
            toast("Success Registration", {
                type: "success"
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast(e.response?.data?.message, {
                type: "error"
            });
        }
    }
    const handleLogout = async () => {
        try {
            const response = await AuthService.logout()
            localStorage.removeItem('token')
            dispatch(setAuth(false));
            dispatch(setUser(null))
            toast("Success Logout", {
                type: "success"
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast(e.response?.data?.message, {
                type: "error"
            });
        }
    }
    const checkAuth = async() => {
        try {
            const response = await AuthService.auth()
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            dispatch(setUser(response.data.user))
            toast("Success checkAuth", {
                type: "success"
            });
        } catch (e: any) {
            console.log(e.response?.data?.message)
            toast(e.response?.data?.message, {
                type: "error"
            });
        }
    }
    
    return (
        <div>
            <div className="email_part">
                <input
                    value={email}
                    onChange={(e) => setInputEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="password_part">
                <input
                    value={password}
                    onChange={(e) => setInputPassowrd(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
            </div>
            <button onClick={() => handleRegistration()}>Registration</button>
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
    )
}