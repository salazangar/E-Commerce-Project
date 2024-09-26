import { CartItem } from "./cart-item";

export class OrderItem {

    imageUrl!: string;
    untiPrice!: number;
    quantity!: number;
    productId!: number;

    constructor(cartItem: CartItem) { 

        this.imageUrl = cartItem.imageUrl;
        this.untiPrice = cartItem.unitPrice;
        this.quantity = cartItem.quantity;
        this.productId = cartItem.id; 
    }
}
