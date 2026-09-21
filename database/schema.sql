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

-- ==========================================================
-- Comprehensive Seed Data for Real World Enterprise Testing
-- ==========================================================

-- 1. Seed Departments
INSERT INTO departments (dept_id, dept_name, description) VALUES
(1, 'Engineering', 'Software development, infrastructure and QA engineering'),
(2, 'Human Resources', 'Talent acquisition, employee relations, lifecycle and compliance'),
(3, 'Finance', 'Payroll, accounting, taxation and statutory filings'),
(4, 'Product Management', 'Product strategy, roadmap and user experience design'),
(5, 'Operations', 'IT support, administration, facilities and logistics'),
(6, 'Marketing', 'Digital branding, content marketing, growth and public relations')
ON DUPLICATE KEY UPDATE dept_name=VALUES(dept_name), description=VALUES(description);

-- 2. Seed Users (All pre-seeded with BCrypt hash for 'Password123!')
-- Hash: $2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q
INSERT INTO users (id, name, phone_number, email, password_hash, role, is_active) VALUES
(100, 'System Administrator', '9998887770', 'admin@hris.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'ADMIN', TRUE),
(101, 'Arun Kumar', '9876543210', 'arun.kumar@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', TRUE),
(102, 'Priya Sharma', '9876543211', 'priya.sharma@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'MANAGER', TRUE),
(103, 'Rithanya S', '9876543212', 'rithanya.s@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'HR_BP', TRUE),
(104, 'Karthik Rajan', '9876543213', 'karthik.rajan@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'MANAGER', TRUE),
(105, 'Ananya Sen', '9876543214', 'ananya.sen@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'FINANCE_OFFICER', TRUE),
(106, 'Deepak Patel', '9876543215', 'deepak.patel@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', TRUE),
(107, 'Sneha Reddy', '9876543216', 'sneha.reddy@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', TRUE),
(108, 'Vikram Singh', '9876543217', 'vikram.singh@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', TRUE),
(109, 'Meera Nair', '9876543218', 'meera.nair@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name), role=VALUES(role), is_active=VALUES(is_active);

-- 3. Seed Employees (Managers first, then reporting team members)
INSERT INTO employees (id, employee_id, name, phone_number, email, user_id, department_id, manager_id, designation, date_of_joining, employment_type, status) VALUES
(2, 'EMP0002', 'Priya Sharma', '9876543211', 'priya.sharma@company.com', 102, 1, NULL, 'Director of Engineering', '2023-01-10', 'FULL_TIME', 'ACTIVE'),
(3, 'EMP0003', 'Rithanya S', '9876543212', 'rithanya.s@company.com', 103, 2, NULL, 'Lead HR Business Partner', '2023-03-01', 'FULL_TIME', 'ACTIVE'),
(4, 'EMP0004', 'Karthik Rajan', '9876543213', 'karthik.rajan@company.com', 104, 4, NULL, 'VP of Product Management', '2023-05-15', 'FULL_TIME', 'ACTIVE'),
(5, 'EMP0005', 'Ananya Sen', '9876543214', 'ananya.sen@company.com', 105, 3, NULL, 'Senior Finance Officer', '2023-06-01', 'FULL_TIME', 'ACTIVE'),
(1, 'EMP0001', 'Arun Kumar', '9876543210', 'arun.kumar@company.com', 101, 1, 2, 'Senior Software Engineer', '2024-01-15', 'FULL_TIME', 'ACTIVE'),
(6, 'EMP0006', 'Deepak Patel', '9876543215', 'deepak.patel@company.com', 106, 1, 2, 'DevOps & Cloud Specialist', '2024-02-01', 'FULL_TIME', 'ACTIVE'),
(7, 'EMP0007', 'Sneha Reddy', '9876543216', 'sneha.reddy@company.com', 107, 4, 4, 'Lead UI/UX Designer', '2024-03-10', 'FULL_TIME', 'ACTIVE'),
(8, 'EMP0008', 'Vikram Singh', '9876543217', 'vikram.singh@company.com', 108, 2, 3, 'Talent Acquisition Executive', '2024-04-01', 'FULL_TIME', 'ACTIVE'),
(9, 'EMP0009', 'Meera Nair', '9876543218', 'meera.nair@company.com', 109, 3, 5, 'Senior Financial Analyst', '2024-05-20', 'FULL_TIME', 'ACTIVE')
ON DUPLICATE KEY UPDATE name=VALUES(name), designation=VALUES(designation), status=VALUES(status);

-- 4. Seed Leave Applications
INSERT INTO leave_applications (id, employee_id, leave_type, from_date, to_date, reason, status, approved_by) VALUES
(1, 1, 'CASUAL', '2026-08-10', '2026-08-12', 'Family event in hometown', 'APPROVED', 2),
(2, 1, 'SICK', '2026-09-02', '2026-09-03', 'Seasonal viral fever', 'APPROVED', 2),
(3, 1, 'EARNED', '2026-10-15', '2026-10-18', 'Annual family vacation', 'PENDING', NULL),
(4, 6, 'CASUAL', '2026-09-18', '2026-09-19', 'Personal bank work', 'APPROVED', 2),
(5, 6, 'SICK', '2026-10-01', '2026-10-01', 'Doctor consultation', 'PENDING', NULL),
(6, 7, 'EARNED', '2026-08-20', '2026-08-25', 'Design conference attendance', 'APPROVED', 4),
(7, 7, 'CASUAL', '2026-09-28', '2026-09-29', 'Home relocation', 'PENDING', NULL),
(8, 8, 'SICK', '2026-07-14', '2026-07-15', 'Medical checkup', 'APPROVED', 3),
(9, 8, 'CASUAL', '2026-10-05', '2026-10-06', 'Personal emergency', 'PENDING', NULL),
(10, 9, 'EARNED', '2026-09-10', '2026-09-12', 'Quarter-end recovery leave', 'APPROVED', 5)
ON DUPLICATE KEY UPDATE status=VALUES(status), reason=VALUES(reason);

-- 5. Seed Payroll Records
-- Gross CTC breakdown: PF = 12%, ESI = 0.75%, TDS = 10% approx, Net Pay = Gross - (PF + ESI + TDS)
INSERT INTO payroll (id, employee_id, pay_period, gross, pf_employee, esi_employee, tds, net_pay, status) VALUES
(1, 1, '2026-07-31', 85000.00, 10200.00, 637.50, 8500.00, 65662.50, 'DISBURSED'),
(2, 1, '2026-08-31', 85000.00, 10200.00, 637.50, 8500.00, 65662.50, 'DISBURSED'),
(3, 2, '2026-07-31', 150000.00, 18000.00, 1125.00, 15000.00, 115875.00, 'DISBURSED'),
(4, 2, '2026-08-31', 150000.00, 18000.00, 1125.00, 15000.00, 115875.00, 'DISBURSED'),
(5, 3, '2026-08-31', 110000.00, 13200.00, 825.00, 11000.00, 84975.00, 'DISBURSED'),
(6, 4, '2026-08-31', 140000.00, 16800.00, 1050.00, 14000.00, 108150.00, 'DISBURSED'),
(7, 5, '2026-08-31', 95000.00, 11400.00, 712.50, 9500.00, 73387.50, 'DISBURSED'),
(8, 6, '2026-08-31', 80000.00, 9600.00, 600.00, 8000.00, 61800.00, 'DISBURSED'),
(9, 7, '2026-08-31', 75000.00, 9000.00, 562.50, 7500.00, 57937.50, 'DISBURSED'),
(10, 8, '2026-08-31', 55000.00, 6600.00, 412.50, 5500.00, 42487.50, 'DISBURSED'),
(11, 9, '2026-08-31', 65000.00, 7800.00, 487.50, 6500.00, 50212.50, 'DISBURSED')
ON DUPLICATE KEY UPDATE gross=VALUES(gross), net_pay=VALUES(net_pay), status=VALUES(status);

-- 6. Seed Performance Appraisals
INSERT INTO appraisals (id, employee_id, cycle_year, self_rating, manager_rating, final_rating, increment_percentage, status) VALUES
(1, 1, 2026, 4.40, 4.20, 4.30, 12.50, 'CLOSED'),
(2, 6, 2026, 4.10, 4.00, 4.05, 10.00, 'CLOSED'),
(3, 7, 2026, 4.70, 4.50, 4.60, 14.00, 'CLOSED'),
(4, 8, 2026, 3.80, 3.70, 3.75, 8.50, 'CLOSED'),
(5, 9, 2026, 4.20, 4.10, 4.15, 11.00, 'CLOSED'),
(6, 1, 2025, 4.10, 3.90, 4.00, 9.50, 'CLOSED')
ON DUPLICATE KEY UPDATE final_rating=VALUES(final_rating), status=VALUES(status);

-- 7. Seed Skills
INSERT INTO skills (id, skill_name, category) VALUES
(1, 'Java 17 / Spring Boot', 'Backend Development'),
(2, 'React.js & Modern Frontend', 'Frontend Development'),
(3, 'Cloud Infrastructure (Docker / K8s)', 'DevOps & Cloud'),
(4, 'MySQL Database Design', 'Database'),
(5, 'UI/UX Design (Figma)', 'Design & Creative'),
(6, 'Statutory Compliance & PF/ESI', 'Human Resources'),
(7, 'Financial Modeling & Budgeting', 'Finance'),
(8, 'Agile & Scrum Leadership', 'Project Management'),
(9, 'Talent Acquisition & Sourcing', 'Human Resources'),
(10, 'REST API & Microservices', 'Backend Development')
ON DUPLICATE KEY UPDATE skill_name=VALUES(skill_name), category=VALUES(category);

-- 8. Seed Employee Skills Mapping
INSERT INTO employee_skills (employee_id, skill_id, proficiency_level) VALUES
(1, 1, 'EXPERT'),
(1, 2, 'ADVANCED'),
(1, 4, 'ADVANCED'),
(1, 10, 'EXPERT'),
(2, 1, 'EXPERT'),
(2, 8, 'EXPERT'),
(3, 6, 'EXPERT'),
(3, 8, 'ADVANCED'),
(3, 9, 'EXPERT'),
(4, 5, 'ADVANCED'),
(4, 8, 'EXPERT'),
(5, 6, 'EXPERT'),
(5, 7, 'EXPERT'),
(6, 3, 'EXPERT'),
(6, 10, 'ADVANCED'),
(7, 2, 'INTERMEDIATE'),
(7, 5, 'EXPERT'),
(8, 6, 'ADVANCED'),
(8, 9, 'ADVANCED'),
(9, 7, 'ADVANCED')
ON DUPLICATE KEY UPDATE proficiency_level=VALUES(proficiency_level);
