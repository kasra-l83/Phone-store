export interface IProduct{
    brand: string
    category: string
    createdAt: string
    description: string
    images: File
    name: string
    price: number
    quantity: number
    rating: Array<number>
    slugname: string
    subcategory: string
    thumbnail: Array<File>
    updatedAt: string
    _id: string
}
export interface ICategory{
    _id: string
    name: string
    icon: File
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