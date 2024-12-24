export interface IUser{
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
export interface ILogin{
    username: string
    password: string
}
export interface ISignup{
    username: string
    password: string
    firstname: string
    lastname: string
    phoneNumber: string
    address: string
}