package com.db.grad.javaapi.Service;


import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.model.Trade;
import com.db.grad.javaapi.repository.TradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.db.grad.javaapi.utils.DateUtils.dateFormatter;

@Service
public class TradeHandler implements ITradeService{

    private TradeRepository tradeRepository;

    @Autowired
    public TradeHandler(TradeRepository TradeRepository) {
        this.tradeRepository = TradeRepository;
    }

    @Override
    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    @Override
    public Trade addTrade(Trade theTrade) {
        return tradeRepository.save(theTrade);
    }

    @Override
    public long getNoOfTrades() {
        return tradeRepository.count();
    }

    @Override
    public boolean removeTrade(long uniqueId) {
        boolean result = false;

        Optional<Trade> theTrade = tradeRepository.findById(uniqueId);
        if(theTrade.isPresent())
        {
            tradeRepository.delete(theTrade.get());
            result = true;
        }

        return  result;
    }

    @Override
    public Trade getTradeById(long uniqueId) {
        Trade TradeToFind = new Trade();
        TradeToFind.setId(uniqueId);
        List<Trade> Trades = tradeRepository.findByTradeID(TradeToFind);
        Trade result = null;

        if( Trades.size() == 1)
            result = Trades.get(0);

        return result;
    }

    @Override
    public Trade getTradeByBookID(long BookID) {
        Trade TradeToFind = new Trade();
        TradeToFind.setBook_id(BookID);
        List<Trade> Trades = tradeRepository.findByBookID(TradeToFind);
        Trade result = null;

        if( Trades.size() == 1)
            result = Trades.get(0);

        return result;
    }

    public List<Trade> getTradesBySecuritiesID(List<Long> securityIds){
        if (securityIds == null) return null;
        if (securityIds.isEmpty()) return new ArrayList<>();
        return tradeRepository.findTradesBySecuritiesID(securityIds);
    }

    @Override
    public Trade updateTradeDetails(Trade TradeToUpdate) {
        return tradeRepository.save(TradeToUpdate);
    }

    public List<Trade> getTradesBySettlementDate(String settlementDate) {
        Date settlementDateSQL=Date.valueOf(settlementDate);

        return tradeRepository.getTradesBySettlementDate(settlementDateSQL);
    }
}