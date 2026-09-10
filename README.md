# Human Resource Information System (HRIS) - Multi-Tier Distributed Application

## Project Structure

```
HRIS/
├── backend/                  # Java 17/24 + Spring Boot 3.2.5 REST Microservice
│   ├── src/main/java/com/examly/springapp/
│   │   ├── controller/       # REST API Controllers (Employee, Leave, Payroll, Auth)
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── exception/        # Global Exception Handlers
│   │   ├── model/            # JPA Entities
│   │   ├── repository/       # Spring Data Repositories
│   │   ├── security/         # Spring Security & JWT Token Provider
│   │   └── service/          # Business Logic Services
│   └── pom.xml
│
├── frontend/                 # React 18 + Vite SPA
│   ├── dist/                 # Production Build Assets
│   │   ├── assets/
│   │   └── index.html
│   ├── src/
│   │   ├── api/              # API Client & Axios Integrations
│   │   ├── components/       # Reusable Components (common & layout)
│   │   │   ├── common/       # DataTable, Modal, Toast, StatCard, StatusBadge
│   │   │   └── layout/       # AppLayout, Navbar, Sidebar, Footer
│   │   ├── context/          # AuthContext
│   │   ├── pages/            # View Pages
│   │   │   ├── admin/        # AuditLogPage, UserManagementPage
│   │   │   ├── auth/         # LoginPage, RegisterPage
│   │   │   ├── dashboards/   # AdminDashboard, HRDashboard, ManagerDashboard, EmployeeDashboard, Dashboard
│   │   │   ├── employees/    # EmployeeListPage, EmployeeDetailPage
│   │   │   ├── leaves/       # LeaveListPage, LeaveApplyPage
│   │   │   ├── payroll/      # PayrollListPage
│   │   │   ├── appraisals/   # AppraisalListPage
│   │   │   ├── skills/       # SkillsPage
│   │   │   └── profile/      # ProfilePage
│   │   ├── routes/           # ProtectedRoute, RoleRoute
│   │   ├── services/         # Centralized Axios Client & Service functions
│   │   ├── App.jsx           # Main React Router Routing
│   │   ├── index.css         # Global CSS Design Tokens
│   │   └── main.jsx          # React DOM Root Entry
│   ├── .env                  # VITE_API_BASE_URL
│   ├── index.html
│   └── package.json
│
├── database/
│   └── schema.sql            # MySQL DDL & Seed scripts
├── docker-compose.yml
├── start_hris.bat            # One-click Windows Launcher
└── README.md
```

## Running the Application

1. **Quick Start**: Double click `start_hris.bat` in the root folder.
2. **Backend**: Running on `http://localhost:8080`
3. **Frontend**: Running on `http://localhost:8081`
4. **Swagger UI**: Accessible at `http://localhost:8080/swagger-ui/index.html`
