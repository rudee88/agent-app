export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    shortDesc: string;
    categoryId?: string;
}