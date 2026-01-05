package com.icecream.order.service;

import com.icecream.order.model.Order;
import com.icecream.order.model.OrderItem;
import com.icecream.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository repository;
    private final RestTemplate restTemplate;

    public Order createOrder(Order order) {
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("PLACED");

        // 1. Check/Adjust Inventory (Simple deduction)
        for (OrderItem item : order.getItems()) {
            try {
                String inventoryUrl = "http://inventory-service:8084/api/inventory/" + item.getProductId()
                        + "/adjust?adjustment=-" + item.getQuantity();
                restTemplate.postForObject(inventoryUrl, null, Object.class);
            } catch (Exception e) {
                System.err.println(
                        "Failed to adjust inventory for product " + item.getProductId() + ": " + e.getMessage());
            }
        }

        Order savedOrder = repository.save(order);

        // 2. Notify Notification Service
        try {
            String notificationUrl = "http://notification-service:8001/api/notifications/send";
            Map<String, String> notification = new HashMap<>();
            notification.put("recipient", order.getUserEmail());
            notification.put("subject", "Order Confirmation #" + savedOrder.getId());
            notification.put("body",
                    "Thank you for your order. Total: " + order.getTotalAmount() + " USD. Your scoops are coming!");
            restTemplate.postForObject(notificationUrl, notification, Object.class);
        } catch (Exception e) {
            System.err.println("Failed to send notification: " + e.getMessage());
        }

        return savedOrder;
    }

    public List<Order> getOrdersByUser(String email) {
        return repository.findByUserEmail(email);
    }
}
