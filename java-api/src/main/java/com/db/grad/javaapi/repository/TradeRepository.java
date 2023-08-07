package com.db.grad.javaapi.repository;

import com.db.grad.javaapi.model.Security;
import com.db.grad.javaapi.model.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {

    @Query(nativeQuery = true, value = "select * from trades where book_id = :book_id")
    List<Trade> findByBookID(Trade book_id);

    @Query(nativeQuery = true, value = "select * from trades where id = :trade_id")
    List<Trade> findByTradeID(Trade trade_id);


    @Query(nativeQuery = true, value = "select * from trades where security_id in :securities_ids")
    List<Trade> findTradesBySecuritiesID(List<Long> securities_ids);

    @Query(nativeQuery = true, value = "select * from trades where settlement_date = :settlementDateSQL")
    List<Trade> getTradesBySettlementDate(Date settlementDateSQL);
}