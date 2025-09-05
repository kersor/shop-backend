export class CreateUserDto {
    email: string
    password: string
}

export class UserDto {
    email: string
    password: string
    name?: string
    surname?: string
    phone?: string
}