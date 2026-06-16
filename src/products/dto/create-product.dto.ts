export class CreateProductDto {
    name!: string
    price!: number
    sale!: boolean
    slug!: string
    description!: string
    categoryId!: string
    photos_url?: string[]
}
