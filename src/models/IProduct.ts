export interface IProduct {
    title: string,
    price: string,
    imgUrl:
      string,
    vendorCode: string,
    vendor: string,
    description:
      string,
    categoryId: string,
    id: string,
    available: string,
    params?: Array<ProductParams>
}
export interface ProductParams {
    name: string,
    value: string
}