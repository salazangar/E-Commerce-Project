import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem){

    let alreadyExists : boolean = false;
    let existingCartItem: CartItem = undefined!;

    // check if we alreayd have the item in cart
    if(this.cartItems.length > 0){
      // find the item in cart based on item id
      for (let tempItem of this.cartItems){
        if(tempItem.id == cartItem.id){
          existingCartItem = tempItem;
          break;
        }
      }
      // check if we found it 
      if(existingCartItem != undefined){
        alreadyExists = true;
      }
    }

    if(alreadyExists){
      // increment quanity
      existingCartItem.quantity++;
    }else{
      // add to list
      this.cartItems.push(cartItem);
    }

    // compute total price and quanity in cart
    this.computeCartTotals(); 
    
  }

  computeCartTotals() {

    let totalPriceValue : number = 0;
    let totalQuantityValue: number = 0;

    for( let temp of this.cartItems){
      totalPriceValue += temp.quantity*temp.unitPrice;
      totalQuantityValue += temp.quantity;
    }

    // public the new values to subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
    // log cart data (just for debugging)
    this.logCartData(totalPriceValue, totalQuantityValue);
    
  }



  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of cart: ');
    for(let temp of this.cartItems){
      const subTotalPrice = temp.quantity * temp.unitPrice;
      console.log(`name: ${ temp.name }, quantity: ${ temp.quantity }, unitPrice: ${ temp.unitPrice }, subTotalPrice: ${ subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue.toFixed(2)}`);
    console.log('--------')
  }

}
