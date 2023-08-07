package com.db.grad.javaapi.controller;



import com.db.grad.javaapi.Service.TradeHandler;
import com.db.grad.javaapi.exception.ResourceNotFoundException;
import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.model.Trade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//@RequestMapping("/api/v1")
//@CrossOrigin(origins = "http://localhost:3000")
public class TradeController {

    TradeHandler tradeHandler;

    @Autowired
    public TradeController(TradeHandler tradeHandler) {
        this.tradeHandler = tradeHandler;
    }

    @GetMapping("/trades")
    public List<Trade> getAllTrades() {
        return tradeHandler.getAllTrades();
    }

    @GetMapping("/trades/{id}")
    public ResponseEntity<Trade> getEmployeeById(@PathVariable(value = "id") long id)
            throws ResourceNotFoundException {
        Trade Trades = tradeHandler.getTradeById(id);
        return ResponseEntity.ok().body(Trades);
    }

    @PostMapping("/trades")
    public Trade createTrade(@Valid @RequestBody Trade Trade) {
        return tradeHandler.addTrade(Trade);
    }

    @PutMapping("/trades/{id}")
    public ResponseEntity<Trade> updateTrade(@PathVariable(value = "id") long id,
                                             @Valid @RequestBody Trade TradeDetails) throws ResourceNotFoundException {

        final Trade updatedTrades = tradeHandler.updateTradeDetails(TradeDetails);
        return ResponseEntity.ok(updatedTrades);
    }

    @DeleteMapping("/trades/{id}")
    public Map<String, Boolean> deleteTrade(@PathVariable(value = "id") long id)
            throws ResourceNotFoundException {
        boolean removed = tradeHandler.removeTrade(id);

        Map<String, Boolean> response = new HashMap<>();
        if (removed)
            response.put("deleted", Boolean.TRUE);
        else
            response.put("deleted", Boolean.FALSE);

        return response;
    }

    @PostMapping("/trades/securityIDs")
    public ResponseEntity<?> getTradesBySecurityId(@RequestBody List<Long> ids)
            throws ResourceNotFoundException {
        List<Trade> trades = tradeHandler.getTradesBySecuritiesID(ids);
        if (trades == null) return ResponseEntity.badRequest().body("Security id is invalid or no trades map to id");
        return ResponseEntity.ok().body(trades);
    }


    @GetMapping("/trades/filter")
    public List<Trade> getTradesBySettlementDate(@RequestParam String settlementDate)
            throws ResourceNotFoundException {
        try {
            return tradeHandler.getTradesBySettlementDate(settlementDate);
        } catch (DateTimeParseException e) {
            throw new ResourceNotFoundException("Invalid date format. Please provide the date in yyyy-MM-dd format.");
        }
    }
}
