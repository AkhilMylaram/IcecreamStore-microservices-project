package com.icecream.inventory.service;

import com.icecream.inventory.model.InventoryItem;
import com.icecream.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final InventoryRepository repository;

    public InventoryItem updateStock(String productId, int quantityChange) {
        InventoryItem item = repository.findByProductId(productId)
                .orElse(InventoryItem.builder().productId(productId).stockCount(0).build());
        item.setStockCount(item.getStockCount() + quantityChange);
        return repository.save(item);
    }

    public Optional<InventoryItem> getStock(String productId) {
        return repository.findByProductId(productId);
    }
}
