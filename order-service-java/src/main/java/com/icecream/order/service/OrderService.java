package com.icecream.order.service;

import com.icecream.order.model.Order;
import com.icecream.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repository;

    public Order createOrder(Order order) {
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("PENDING");
        return repository.save(order);
    }

    public List<Order> getOrdersByUser(String email) {
        return repository.findByUserEmail(email);
    }
}
