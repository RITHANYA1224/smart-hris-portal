-- Seed Departments
INSERT INTO departments (dept_id, dept_name, description) VALUES
(1, 'Engineering', 'Product development and technology'),
(2, 'Human Resources', 'Employee lifecycle and compliance'),
(3, 'Finance', 'Payroll, accounting, and statutory filings');

-- Seed Users
INSERT INTO users (id, name, phone_number, email, password_hash, role, created_date, is_active) VALUES
(101, 'Arun Kumar', '9876543210', 'arun.kumar@company.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'EMPLOYEE', CURRENT_TIMESTAMP, TRUE),
(102, 'Priya Sharma', '9876543211', 'priya.sharma@company.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'MANAGER', CURRENT_TIMESTAMP, TRUE),
(103, 'Rithanya S', '9876543212', 'rithanya.s@company.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', 'HR_BP', CURRENT_TIMESTAMP, TRUE);


-- Seed Employees
INSERT INTO employees (id, employee_id, name, phone_number, email, user_id, department_id, manager_id, designation, date_of_joining, employment_type, status) VALUES
(2, 'EMP0002', 'Priya Sharma', '9876543211', 'priya.sharma@company.com', 102, 1, NULL, 'Engineering Manager', '2024-02-10', 'FULL_TIME', 'ACTIVE'),
(3, 'EMP0003', 'Rithanya S', '9876543212', 'rithanya.s@company.com', 103, 2, NULL, 'HR Business Partner', '2024-03-01', 'FULL_TIME', 'ACTIVE'),
(1, 'EMP0001', 'Arun Kumar', '9876543210', 'arun.kumar@company.com', 101, 1, 2, 'Software Engineer', '2024-01-15', 'FULL_TIME', 'ACTIVE');

-- Seed Leave Applications
INSERT INTO leave_applications (id, employee_id, leave_type, from_date, to_date, reason, status, approved_by) VALUES
(1, 1, 'CASUAL', '2026-07-20', '2026-07-21', 'Family event', 'APPROVED', 2),
(2, 1, 'SICK', '2026-08-05', '2026-08-05', 'Fever', 'PENDING', NULL);

-- Seed Payroll
INSERT INTO payroll (id, employee_id, pay_period, gross, pf_employee, esi_employee, tds, net_pay, status) VALUES
(1, 1, '2026-06-30', 75000.00, 9000.00, 562.50, 7500.00, 57937.50, 'DISBURSED'),
(2, 2, '2026-06-30', 120000.00, 14400.00, 900.00, 12000.00, 92700.00, 'DISBURSED');

-- Seed Appraisals
INSERT INTO appraisals (id, employee_id, cycle_year, self_rating, manager_rating, final_rating, increment_percentage, status) VALUES
(1, 1, 2026, 4.20, 4.00, 4.10, 10.00, 'CLOSED');

-- Seed Skills
INSERT INTO skills (id, skill_name, category) VALUES
(1, 'Java', 'Technical'),
(2, 'Communication', 'Soft Skill');

-- Seed Employee Skills
INSERT INTO employee_skills (employee_id, skill_id, proficiency_level) VALUES
(1, 1, 'ADVANCED'),
(1, 2, 'INTERMEDIATE');
