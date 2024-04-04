export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
    first_name?: string;
    last_name?: string;
    password?: string;
    history: IHistory[];
    orderNumber: number[]
}
export interface IHistory {
    last_name: string
    first_name: string
    phone_number: string
    email: string
    city: string
    delivery: {
        postamt: string | undefined,
        postOffice: string | undefined,
        courier: string
    }
    cart: IHistoryCart[]
    activePay: string
    totalPrice: number
    dateInfo: string
    timeInfo: string
}
export interface IHistoryCart {
    id: string
    title: string
    count: number
    price: string
    img: string
}