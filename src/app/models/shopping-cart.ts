import { IAddress } from './address';

export interface IItem {
    id: number;
    quantity: number;
}

export class ShoppingCart {
    $key?: string;
    id: string;
    items: IItem[];
    shipping_address?: IAddress;
    billing_address?: IAddress;

    constructor(sessionId: string, $key?: string, items?: IItem[]) {
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
