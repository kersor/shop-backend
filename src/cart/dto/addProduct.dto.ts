// + | -
export type TypeToggleCountProductDto = "increment" | "decrement"

export class AddProductDto {
    productId: string
}

export class DeleteProductDto {
    productId: string
}

export class ToggleCountProductDto {
    type: TypeToggleCountProductDto
    productId: string
}