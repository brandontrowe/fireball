import { IAddress } from './address';

export class ShoppingCart {
    id: string;
    products: number[];
    shipping_address: IAddress;
    billing_address: IAddress;

    constructor(sessionId: string) {
        this.id = sessionId;
        this.products = [];

    }

    

    addProduct(productId: number) {
        console.log('a thing')
        this.products.push(productId);
    };

}
