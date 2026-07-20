-- Database Schema for Human Resource Information System (HRIS)
-- Target: MySQL 8.0+

CREATE DATABASE IF NOT EXISTS hris_db;
USE hris_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('GUEST', 'EMPLOYEE', 'MANAGER', 'HR_BP', 'FINANCE_OFFICER', 'DEPT_HEAD', 'ADMIN') NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT chk_user_phone CHECK (phone_number REGEXP '^[0-9]{10}$'),
    CONSTRAINT chk_user_name CHECK (name REGEXP '^[A-Za-z ]+$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    user_id INT UNIQUE NULL,
    department_id INT NULL,
    manager_id INT NULL,
    designation VARCHAR(100) NOT NULL,
    date_of_joining DATE NOT NULL,
    employment_type ENUM('FULL_TIME', 'PART_TIME', 'CONTRACT') NOT NULL,
    status ENUM('ACTIVE', 'ON_NOTICE', 'SEPARATED') NOT NULL,
    CONSTRAINT fk_emp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_emp_dept FOREIGN KEY (department_id) REFERENCES departments(dept_id) ON DELETE SET NULL,
    CONSTRAINT fk_emp_mgr FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    CONSTRAINT chk_emp_phone CHECK (phone_number REGEXP '^[0-9]{10}$'),
    CONSTRAINT chk_emp_name CHECK (name REGEXP '^[A-Za-z ]+$')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. LeaveApplications Table
CREATE TABLE IF NOT EXISTS leave_applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type ENUM('CASUAL', 'SICK', 'EARNED', 'COMP_OFF', 'LOP') NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    reason TEXT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    approved_by INT NULL,
    CONSTRAINT fk_leave_emp FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_leave_approver FOREIGN KEY (approved_by) REFERENCES employees(id) ON DELETE SET NULL,
    CONSTRAINT chk_leave_dates CHECK (to_date >= from_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Payroll Table
CREATE TABLE IF NOT EXISTS payroll (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    pay_period DATE NOT NULL,
    gross DECIMAL(12, 2) NOT NULL,
    pf_employee DECIMAL(10, 2) NOT NULL,
    esi_employee DECIMAL(10, 2) NOT NULL,
    tds DECIMAL(10, 2) NOT NULL,
    net_pay DECIMAL(12, 2) NOT NULL,
    status ENUM('DRAFT', 'PROCESSED', 'DISBURSED') DEFAULT 'DRAFT',
    CONSTRAINT fk_payroll_emp FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT chk_gross_positive CHECK (gross >= 0),
    CONSTRAINT chk_net_positive CHECK (net_pay >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Appraisals Table
CREATE TABLE IF NOT EXISTS appraisals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    cycle_year INT NOT NULL,
    self_rating DECIMAL(3, 2) NULL,
    manager_rating DECIMAL(3, 2) NULL,
    final_rating DECIMAL(3, 2) NULL,
    increment_percentage DECIMAL(5, 2) NULL,
    status ENUM('SELF_REVIEW', 'MANAGER_REVIEW', 'CLOSED') DEFAULT 'SELF_REVIEW',
    CONSTRAINT fk_appraisal_emp FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT chk_self_rating CHECK (self_rating BETWEEN 0.00 AND 5.00),
    CONSTRAINT chk_mgr_rating CHECK (manager_rating BETWEEN 0.00 AND 5.00),
    CONSTRAINT chk_final_rating CHECK (final_rating BETWEEN 0.00 AND 5.00)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. EmployeeSkills (Junction Table)
CREATE TABLE IF NOT EXISTS employee_skills (
    employee_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT') NOT NULL,
    PRIMARY KEY (employee_id, skill_id),
    CONSTRAINT fk_emp_skill_emp FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    CONSTRAINT fk_emp_skill_skill FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================
-- Sample Data Seed Script
-- ==========================================

-- Insert Departments
INSERT INTO departments (dept_id, dept_name, description) VALUES
(1, 'Engineering', 'Product development and technology'),
(2, 'Human Resources', 'Employee lifecycle and compliance'),
(3, 'Finance', 'Payroll, accounting, and statutory filings')
ON DUPLICATE KEY UPDATE dept_name=VALUES(dept_name);

-- Insert Users
-- Seeded hashes map to BCrypt hash of 'Password123!'
INSERT INTO users (id, name, phone_number, email, password_hash, role, is_active) VALUES
(101, 'Arun Kumar', '9876543210', 'arun.kumar@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', TRUE),
(102, 'Priya Sharma', '9876543211', 'priya.sharma@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'MANAGER', TRUE),
(103, 'Rithanya S', '9876543212', 'rithanya.s@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'HR_BP', TRUE)
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- Insert Employees (Priya & Rithanya first to avoid Manager FK lookup issues, then Arun who reports to Priya)
INSERT INTO employees (id, employee_id, name, phone_number, email, user_id, department_id, manager_id, designation, date_of_joining, employment_type, status) VALUES
(2, 'EMP0002', 'Priya Sharma', '9876543211', 'priya.sharma@company.com', 102, 1, NULL, 'Engineering Manager', '2024-02-10', 'FULL_TIME', 'ACTIVE'),
(3, 'EMP0003', 'Rithanya S', '9876543212', 'rithanya.s@company.com', 103, 2, NULL, 'HR Business Partner', '2024-03-01', 'FULL_TIME', 'ACTIVE'),
(1, 'EMP0001', 'Arun Kumar', '9876543210', 'arun.kumar@company.com', 101, 1, 2, 'Software Engineer', '2024-01-15', 'FULL_TIME', 'ACTIVE')
ON DUPLICATE KEY UPDATE employee_id=VALUES(employee_id);

-- Insert Leave Applications
INSERT INTO leave_applications (id, employee_id, leave_type, from_date, to_date, reason, status, approved_by) VALUES
(1, 1, 'CASUAL', '2026-07-20', '2026-07-21', 'Family event', 'APPROVED', 2),
(2, 1, 'SICK', '2026-08-05', '2026-08-05', 'Fever', 'PENDING', NULL)
ON DUPLICATE KEY UPDATE reason=VALUES(reason);

-- Insert Payroll
INSERT INTO payroll (id, employee_id, pay_period, gross, pf_employee, esi_employee, tds, net_pay, status) VALUES
(1, 1, '2026-06-30', 75000.00, 9000.00, 562.50, 7500.00, 57937.50, 'DISBURSED'),
(2, 2, '2026-06-30', 120000.00, 14400.00, 900.00, 12000.00, 92700.00, 'DISBURSED')
ON DUPLICATE KEY UPDATE gross=VALUES(gross);

-- Insert Appraisals
INSERT INTO appraisals (id, employee_id, cycle_year, self_rating, manager_rating, final_rating, increment_percentage, status) VALUES
(1, 1, 2026, 4.20, 4.00, 4.10, 10.00, 'CLOSED')
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- Insert Skills
INSERT INTO skills (id, skill_name, category) VALUES
(1, 'Java', 'Technical'),
(2, 'Communication', 'Soft Skill')
ON DUPLICATE KEY UPDATE skill_name=VALUES(skill_name);

-- Insert EmployeeSkills
INSERT INTO employee_skills (employee_id, skill_id, proficiency_level) VALUES
(1, 1, 'ADVANCED'),
(1, 2, 'INTERMEDIATE')
ON DUPLICATE KEY UPDATE proficiency_level=VALUES(proficiency_level);
