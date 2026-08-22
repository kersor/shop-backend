export class CreateCategoryDto {
    name!: string
    slug!: string
    parentId?: string
}

export class CreateCategoryCatalogDto {
    name!: string
    slug!: string
    children?: CreateCategoryCatalogDto[]
}

export class PaginationDto {
    page!: number
    pageSize!: number
    total!: number
    totalPages!: number
}