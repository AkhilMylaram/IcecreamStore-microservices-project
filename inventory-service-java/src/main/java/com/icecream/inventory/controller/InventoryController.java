package com.icecream.inventory.controller;

import com.icecream.inventory.model.InventoryItem;
import com.icecream.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    private final InventoryService service;

    @GetMapping("/{productId}")
    public ResponseEntity<InventoryItem> getStock(@PathVariable String productId) {
        return service.getStock(productId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{productId}/adjust")
    public ResponseEntity<InventoryItem> adjustStock(@PathVariable String productId, @RequestParam int adjustment) {
        return ResponseEntity.ok(service.updateStock(productId, adjustment));
    }
}
