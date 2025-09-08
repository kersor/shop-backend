export class CreateOrderDto {
    total: number
    products: CreateOrderProductDto[]
}

export class CreateOrderProductDto {
    productId: string
    count: number
    price: number
}