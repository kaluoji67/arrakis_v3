package com.db.grad.javaapi.model;

import java.util.List;

public class FilterParams {
    long user;
    DateRange dateRange;
    List<String> issuerName;
    List<String> type;

    public FilterParams(long user, DateRange dateRange, List<String> issuerName, List<String> type) {
        this.user = user;
        this.dateRange = dateRange;
        this.issuerName = issuerName;
        this.type = type;
    }

    public long getUser() {
        return user;
    }

    public void setUser(long user) {
        this.user = user;
    }

    public DateRange getDateRange() {
        return dateRange;
    }

    public void setDateRange(DateRange dateRange) {
        this.dateRange = dateRange;
    }

    public List<String> getIssuerName() {
        return issuerName;
    }

    public void setIssuerName(List<String> issuerName) {
        this.issuerName = issuerName;
    }

    public List<String> getType() {
        return type;
    }

    public void setType(List<String> type) {
        this.type = type;
    }

}