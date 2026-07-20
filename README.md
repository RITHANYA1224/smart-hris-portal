# Standalone Human Resource Information System (HRIS) - Frontend Only

A modern, secure, and responsive Human Resource Information System (HRIS) designed to manage the complete employee lifecycle, payroll calculation with statutory deductions, leave workflows, performance appraisals, and audit trails. 

This application operates entirely client-side using `localStorage` to simulate database records and a network interceptor to simulate the Spring Boot backend API.

## Folder Structure

```
HRIS/
└── frontend/            # React SPA with Vite & Vanilla CSS
    ├── package.json     # App configurations
    ├── vite.config.js   # Dev server config (Port 8081)
    └── src/             # Frontend source code (Mock API, Views, Components)
```

## Technologies Used

- **Framework:** React.js (v18+)
- **Build Tool:** Vite
- **Routing:** React Router DOM (v6)
- **Styling:** Premium Vanilla CSS (soft pastel colors, responsive design)
- **Data Persistence & Backend Simulation:** Native browser `localStorage` and a global fetch API proxy/interceptor.

---

## Installation & Setup Steps

### 1. Project Launch
1. Ensure Node.js (v18+) is installed.
2. Open a terminal in `frontend/` and install dependency packages:
   ```bash
   npm install
   ```
3. Start the Vite React development server on port 8081:
   ```bash
   npm run dev
   ```
4. Access the web application in your browser at: `http://localhost:8081`.

---

## Default Accounts (Simulated Seed Data)

The application initializes the local storage with the following accounts. All seeded accounts use the password: `Password123!`

| Role | Email / Employee ID / Phone |
| :--- | :--- |
| **Admin** | `admin@hris.com` / `EMP001` / `9876543210` |
| **HR BP** | `hrbp@hris.com` / `EMP002` / `9876543211` |
| **Manager** | `manager@hris.com` / `EMP003` / `9876543212` |
| **Employee** | `employee@hris.com` / `EMP004` / `9876543213` |
| **Finance Officer** | `finance@hris.com` / `EMP005` / `9876543214` |

---

## Simulated Features

1. **Role-Based Dashboards:**
   - **Admin/HR BP:** Add new employee profiles (automatically creates user log-in details), run payroll, start performance appraisals.
   - **Finance Officer:** Process monthly payrolls, view compliance summaries (PF challan and ESI returns reports).
   - **Employee:** View own profile, download current monthly payslip, and apply for leaves.
   - **Manager/Dept Head:** Access pending leave request workflow and approve/reject employee leaves.

2. **Leave Management Workflow:**
   - Employees can file leave requests (`CASUAL`, `SICK`, etc.).
   - Approvers see a list of pending leaves and can approve or reject them.

3. **Payroll Cycle & Statutory Compliance:**
   - Processing payroll generates payslips for active employees.
   - Generates PF Challan (12% matching employer-employee contribution) and ESI Return reports dynamically from payroll runs.
