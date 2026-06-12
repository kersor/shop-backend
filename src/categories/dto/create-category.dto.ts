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