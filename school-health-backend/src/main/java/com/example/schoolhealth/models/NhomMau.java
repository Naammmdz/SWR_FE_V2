package com.example.schoolhealth.models;

public enum NhomMau {
    A_PLUS("A+"), A_MINUS("A-"),
    B_PLUS("B+"), B_MINUS("B-"),
    AB_PLUS("AB+"), AB_MINUS("AB-"),
    O_PLUS("O+"), O_MINUS("O-");

    private final String displayName;

    NhomMau(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
