package com.db.grad.javaapi.model;

public class DateRange {
    String startDateString;
    String endDateString;

    public DateRange() {
    }

    public DateRange(String startDateString, String endDateString) {
        this.startDateString = startDateString;
        this.endDateString = endDateString;
    }

    public String getStartDateString() {
        return startDateString;
    }

    public void setStartDateString(String startDateString) {
        this.startDateString = startDateString;
    }

    public String getEndDateString() {
        return endDateString;
    }

    public void setEndDateString(String endDateString) {
        this.endDateString = endDateString;
    }
}

