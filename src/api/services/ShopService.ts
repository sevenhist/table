import { API_URL } from "api/http";
import axios from "axios";
import { ICategory } from "models/ICategory";
import { IProduct } from "models/IProduct";

export default class ShopService {
    static async getCategories() {
        return axios.get<Array<ICategory>>(`${API_URL}/categories`)
    }
    static async getOneCategory(categoryId: string) {
        return axios.get<ICategory>(`${API_URL}/categories/${categoryId}`)
    }
    static async getProducts(categoryId: string) {
        return axios.get<Array<IProduct>>(`${API_URL}/products?categoryId=${categoryId}`)
    }
    static async getAllProducts() {
        return axios.get<Array<IProduct>>(`${API_URL}/products`)
    }
    static async getOneProduct(id: string) {
        return axios.get<IProduct>(`${API_URL}/products/${id}`)
    }
}