export class CreateProductDto {
    name: string
    photo: string
    price: string
    categoryId: string
}


export class ProductDto {
    id: string
    name: string
    photo: string
    price: string
    categoryId: string
}

export class ProductQueryDto {
    category: string
    page?: string
}