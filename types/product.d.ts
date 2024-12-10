export interface IProduct{
    brand: string
    category: string
    createdAt: string
    description: string
    images: Array<string>
    name: string
    price: number
    quantity: number
    rating: Array<number>
    slugname: string
    subcategory: string
    thumbnail: string
    updatedAt: string
    _id: string
}
export interface ICategory{
    _id: string
    name: string
    icon: string
    createdAt: string
    updatedAt: string
    slugname: string
}
export interface ISubCategory{
    _id: string
    name: string
    category: string
    createdAt: string
    updatedAt: string
    slugname: string
}