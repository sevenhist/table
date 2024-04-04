import { AuthResponse } from "models/response/AuthResponse";
import $api, { API_URL } from "../http";
import axios, { AxiosResponse } from "axios";
import { ICategory } from "models/ICategory";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', {email, password})
    }
    static async registration(email: string, password: string, first_name?: string, last_name?: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', {email, password, first_name, last_name})
    }
    static async logout(): Promise<void> {
        return $api.post('/logout')
    }
    static async auth() {
        return axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
    }
    static async setUserInfo(email: string, first_name?: string, last_name?: string) {
        return $api.post(`${API_URL}/cabinet/personal-information`, {email, first_name, last_name})
    }
    static async setUserPasswords(password: string, new_password: string) {
        return $api.post(`${API_URL}/cabinet/personal-information-passwords`, {password, new_password})
    }
    static async sendDataToEmail(last_name: string, first_name: string, phone_number: string, email: string, 
        city: string | undefined, delivery: any, cart: any[], activePay: string, totalPrice: number, dateInfo: string | undefined, timeInfo: string | undefined) {
        return $api.post(`${API_URL}/send-data`, {last_name, first_name, phone_number, email, city, delivery, cart, activePay, totalPrice, dateInfo, timeInfo})
    }
    static async getHistory() {
        return axios.get(`${API_URL}/get-history`)
    }
}

