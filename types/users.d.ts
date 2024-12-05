export interface IUsers{
    _id: string
    firstname: string
    lastname: string
    username: string
    phoneNumber: number
    address: string
    role: "ADMIN" | "USER"
    createdAt: string
    updatedAt: string
}