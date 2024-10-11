package com.sid.ecommerce.dto;

import com.sid.ecommerce.entity.Address;
import com.sid.ecommerce.entity.Customer;
import com.sid.ecommerce.entity.Order;
import com.sid.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address address;
    private Order order;
    private Set<OrderItem> orderItems;

}
