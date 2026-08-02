package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "payroll")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @Column(name = "pay_period", nullable = false)
    private LocalDate payPeriod;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal gross;

    @Column(name = "pf_employee", nullable = false, precision = 10, scale = 2)
    private BigDecimal pfEmployee;

    @Column(name = "esi_employee", nullable = false, precision = 10, scale = 2)
    private BigDecimal esiEmployee;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal tds;

    @Column(name = "net_pay", nullable = false, precision = 12, scale = 2)
    private BigDecimal netPay;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private PayrollStatus status = PayrollStatus.DRAFT;

    public Payroll() {
    }

    public Payroll(Long id, Employee employee, LocalDate payPeriod, BigDecimal gross, BigDecimal pfEmployee, BigDecimal esiEmployee, BigDecimal tds, BigDecimal netPay, PayrollStatus status) {
        this.id = id;
        this.employee = employee;
        this.payPeriod = payPeriod;
        this.gross = gross;
        this.pfEmployee = pfEmployee;
        this.esiEmployee = esiEmployee;
        this.tds = tds;
        this.netPay = netPay;
        this.status = status != null ? status : PayrollStatus.DRAFT;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Employee getEmployee() { return employee; }
    public void setEmployee(Employee employee) { this.employee = employee; }

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

    public static PayrollBuilder builder() { return new PayrollBuilder(); }

    public static class PayrollBuilder {
        private Long id;
        private Employee employee;
        private LocalDate payPeriod;
        private BigDecimal gross;
        private BigDecimal pfEmployee;
        private BigDecimal esiEmployee;
        private BigDecimal tds;
        private BigDecimal netPay;
        private PayrollStatus status = PayrollStatus.DRAFT;

        public PayrollBuilder id(Long id) { this.id = id; return this; }
        public PayrollBuilder employee(Employee employee) { this.employee = employee; return this; }
        public PayrollBuilder payPeriod(LocalDate payPeriod) { this.payPeriod = payPeriod; return this; }
        public PayrollBuilder gross(BigDecimal gross) { this.gross = gross; return this; }
        public PayrollBuilder pfEmployee(BigDecimal pfEmployee) { this.pfEmployee = pfEmployee; return this; }
        public PayrollBuilder esiEmployee(BigDecimal esiEmployee) { this.esiEmployee = esiEmployee; return this; }
        public PayrollBuilder tds(BigDecimal tds) { this.tds = tds; return this; }
        public PayrollBuilder netPay(BigDecimal netPay) { this.netPay = netPay; return this; }
        public PayrollBuilder status(PayrollStatus status) { this.status = status; return this; }

        public Payroll build() {
            return new Payroll(id, employee, payPeriod, gross, pfEmployee, esiEmployee, tds, netPay, status);
        }
    }
}
