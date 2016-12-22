import { IAddress } from './address';
import { IProduct } from './product';

export class Item {
    id: number;
    quantity: number;
    product: IProduct;

    constructor(id: number, quantity:number = 1, product?: IProduct) {
        this.id = id;
        this.quantity = quantity;
        if(product) {
            this.product = product;
        }
    }
}

export class ShoppingCart {
    $key?: string;
    id: string;
    items: Item[];
    shipping_address?: IAddress;
    billing_address?: IAddress;

    constructor(sessionId: string, $key?: string, items?: Item[]) {
        this.id = sessionId;
        if ($key) {
            this.$key = $key; }
        if (items) {
            this.items = items;
        } else {
            this.items = [];
        }
    }

}
