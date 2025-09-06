export class CreateUserDto {
    email: string
    password: string
}

export class UserDto {
    id: string
    email: string
    password: string
    name?: string
    surname?: string
    phone?: string
}