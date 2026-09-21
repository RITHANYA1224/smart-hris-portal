-- ==========================================================
-- Comprehensive Seed Data for Spring Boot HRIS Application
-- ==========================================================

-- 1. Seed Departments
INSERT INTO departments (dept_id, dept_name, description) VALUES
(1, 'Engineering', 'Software development, infrastructure and QA engineering'),
(2, 'Human Resources', 'Talent acquisition, employee relations, lifecycle and compliance'),
(3, 'Finance', 'Payroll, accounting, taxation and statutory filings'),
(4, 'Product Management', 'Product strategy, roadmap and user experience design'),
(5, 'Operations', 'IT support, administration, facilities and logistics'),
(6, 'Marketing', 'Digital branding, content marketing, growth and public relations')
ON DUPLICATE KEY UPDATE dept_name=VALUES(dept_name);

-- 2. Seed Users
INSERT INTO users (id, name, phone_number, email, password_hash, role, created_date, is_active) VALUES
(100, 'System Administrator', '9998887770', 'admin@hris.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'ADMIN', CURRENT_TIMESTAMP, TRUE),
(101, 'Arun Kumar', '9876543210', 'arun.kumar@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', CURRENT_TIMESTAMP, TRUE),
(102, 'Priya Sharma', '9876543211', 'priya.sharma@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'MANAGER', CURRENT_TIMESTAMP, TRUE),
(103, 'Rithanya S', '9876543212', 'rithanya.s@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'HR_BP', CURRENT_TIMESTAMP, TRUE),
(104, 'Karthik Rajan', '9876543213', 'karthik.rajan@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'MANAGER', CURRENT_TIMESTAMP, TRUE),
(105, 'Ananya Sen', '9876543214', 'ananya.sen@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'FINANCE_OFFICER', CURRENT_TIMESTAMP, TRUE),
(106, 'Deepak Patel', '9876543215', 'deepak.patel@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', CURRENT_TIMESTAMP, TRUE),
(107, 'Sneha Reddy', '9876543216', 'sneha.reddy@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', CURRENT_TIMESTAMP, TRUE),
(108, 'Vikram Singh', '9876543217', 'vikram.singh@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', CURRENT_TIMESTAMP, TRUE),
(109, 'Meera Nair', '9876543218', 'meera.nair@company.com', '$2a$10$fNsz/00ZzG35QdJ8K4K7A.hKkQsz8l.NleY6wY1rKk/eLgR63ZJ0q', 'EMPLOYEE', CURRENT_TIMESTAMP, TRUE)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 3. Seed Employees
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
ON DUPLICATE KEY UPDATE name=VALUES(name);

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
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- 5. Seed Payroll
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
ON DUPLICATE KEY UPDATE gross=VALUES(gross);

-- 6. Seed Appraisals
INSERT INTO appraisals (id, employee_id, cycle_year, self_rating, manager_rating, final_rating, increment_percentage, status) VALUES
(1, 1, 2026, 4.40, 4.20, 4.30, 12.50, 'CLOSED'),
(2, 6, 2026, 4.10, 4.00, 4.05, 10.00, 'CLOSED'),
(3, 7, 2026, 4.70, 4.50, 4.60, 14.00, 'CLOSED'),
(4, 8, 2026, 3.80, 3.70, 3.75, 8.50, 'CLOSED'),
(5, 9, 2026, 4.20, 4.10, 4.15, 11.00, 'CLOSED'),
(6, 1, 2025, 4.10, 3.90, 4.00, 9.50, 'CLOSED')
ON DUPLICATE KEY UPDATE final_rating=VALUES(final_rating);

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
ON DUPLICATE KEY UPDATE skill_name=VALUES(skill_name);

-- 8. Seed Employee Skills
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
