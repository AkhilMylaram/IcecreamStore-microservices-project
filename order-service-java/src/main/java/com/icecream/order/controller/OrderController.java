package com.icecream.order.controller;

import com.icecream.order.model.Order;
import com.icecream.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService service;

    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok(service.createOrder(order));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable String email) {
        return ResponseEntity.ok(service.getOrdersByUser(email));
    }
}
