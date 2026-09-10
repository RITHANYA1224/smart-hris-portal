package com.examly.springapp.dto;

import com.examly.springapp.model.PayrollStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class PayrollDTO {
    private Long id;
    private Long employeeId;
    private String employeeName;
    private LocalDate payPeriod;
    private BigDecimal gross;
    private BigDecimal pfEmployee;
    private BigDecimal esiEmployee;
    private BigDecimal tds;
    private BigDecimal netPay;
    private PayrollStatus status;

    public PayrollDTO() {
    }

    public PayrollDTO(Long id, Long employeeId, String employeeName, LocalDate payPeriod, BigDecimal gross, BigDecimal pfEmployee, BigDecimal esiEmployee, BigDecimal tds, BigDecimal netPay, PayrollStatus status) {
        this.id = id;
        this.employeeId = employeeId;
        this.employeeName = employeeName;
        this.payPeriod = payPeriod;
        this.gross = gross;
        this.pfEmployee = pfEmployee;
        this.esiEmployee = esiEmployee;
        this.tds = tds;
        this.netPay = netPay;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }

    public String getEmployeeName() { return employeeName; }
    public void setEmployeeName(String employeeName) { this.employeeName = employeeName; }

    public LocalDate getPayPeriod() { return payPeriod; }
    public void setPayPeriod(LocalDate payPeriod) { this.payPeriod = payPeriod; }

    public BigDecimal getGross() { return gross; }
    public void setGross(BigDecimal gross) { this.gross = gross; }

    public BigDecimal getPfEmployee() { return pfEmployee; }
    public void setPfEmployee(BigDecimal pfEmployee) { this.pfEmployee = pfEmployee; }

    public BigDecimal getEsiEmployee() { return esiEmployee; }
    public void setEsiEmployee(BigDecimal esiEmployee) { this.esiEmployee = esiEmployee; }

    public BigDecimal getTds() { return tds; }
    public void setTds(BigDecimal tds) { this.tds = tds; }

    public BigDecimal getNetPay() { return netPay; }
    public void setNetPay(BigDecimal netPay) { this.netPay = netPay; }

    public PayrollStatus getStatus() { return status; }
    public void setStatus(PayrollStatus status) { this.status = status; }

    public static PayrollDTOBuilder builder() { return new PayrollDTOBuilder(); }

    public static class PayrollDTOBuilder {
        private Long id;
        private Long employeeId;
        private String employeeName;
        private LocalDate payPeriod;
        private BigDecimal gross;
        private BigDecimal pfEmployee;
        private BigDecimal esiEmployee;
        private BigDecimal tds;
        private BigDecimal netPay;
        private PayrollStatus status;

        public PayrollDTOBuilder id(Long id) { this.id = id; return this; }
        public PayrollDTOBuilder employeeId(Long employeeId) { this.employeeId = employeeId; return this; }
        public PayrollDTOBuilder employeeName(String employeeName) { this.employeeName = employeeName; return this; }
        public PayrollDTOBuilder payPeriod(LocalDate payPeriod) { this.payPeriod = payPeriod; return this; }
        public PayrollDTOBuilder gross(BigDecimal gross) { this.gross = gross; return this; }
        public PayrollDTOBuilder pfEmployee(BigDecimal pfEmployee) { this.pfEmployee = pfEmployee; return this; }
        public PayrollDTOBuilder esiEmployee(BigDecimal esiEmployee) { this.esiEmployee = esiEmployee; return this; }
        public PayrollDTOBuilder tds(BigDecimal tds) { this.tds = tds; return this; }
        public PayrollDTOBuilder netPay(BigDecimal netPay) { this.netPay = netPay; return this; }
        public PayrollDTOBuilder status(PayrollStatus status) { this.status = status; return this; }

        public PayrollDTO build() {
            return new PayrollDTO(id, employeeId, employeeName, payPeriod, gross, pfEmployee, esiEmployee, tds, netPay, status);
        }
    }
}
