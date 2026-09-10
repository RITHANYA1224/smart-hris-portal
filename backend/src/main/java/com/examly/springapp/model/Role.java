package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    GUEST,
    EMPLOYEE,
    MANAGER,
    HR_BP,
    FINANCE_OFFICER,
    DEPT_HEAD,
    ADMIN;

    @JsonCreator
    public static Role fromValue(String value) {
        if (value == null || value.trim().isEmpty()) {
            return EMPLOYEE;
        }
        String clean = value.trim().toUpperCase().replace(" ", "_").replace("-", "_");
        for (Role r : Role.values()) {
            if (r.name().equals(clean) || r.name().equalsIgnoreCase(value.trim())) {
                return r;
            }
        }
        return EMPLOYEE;
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}
