package com.sid.ecommerce.service;

import com.sid.ecommerce.dto.Purchase;
import com.sid.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
