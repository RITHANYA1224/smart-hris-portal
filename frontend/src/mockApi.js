// mockApi.js - Intercepts network calls to simulate the Spring Boot backend locally using localStorage.

const SEED_USERS = [
  { id: 1, name: 'Admin User', phoneNumber: '9876543210', email: 'admin@hris.com', passwordHash: 'Password123!', role: 'Admin', createdDate: new Date().toISOString(), isActive: true },
  { id: 2, name: 'HR BP User', phoneNumber: '9876543211', email: 'hrbp@hris.com', passwordHash: 'Password123!', role: 'HR BP', createdDate: new Date().toISOString(), isActive: true },
  { id: 3, name: 'Manager User', phoneNumber: '9876543212', email: 'manager@hris.com', passwordHash: 'Password123!', role: 'Manager', createdDate: new Date().toISOString(), isActive: true },
  { id: 4, name: 'Employee User', phoneNumber: '9876543213', email: 'employee@hris.com', passwordHash: 'Password123!', role: 'Employee', createdDate: new Date().toISOString(), isActive: true },
  { id: 5, name: 'Finance User', phoneNumber: '9876543214', email: 'finance@hris.com', passwordHash: 'Password123!', role: 'Finance Officer', createdDate: new Date().toISOString(), isActive: true }
];

const SEED_EMPLOYEES = [
  { id: 1, employeeId: 'EMP001', name: 'Admin User', phoneNumber: '9876543210', email: 'admin@hris.com', departmentId: 2, managerId: null, designation: 'System Administrator', dateOfJoining: '2024-01-15', employmentType: 'FULL_TIME', status: 'ACTIVE' },
  { id: 2, employeeId: 'EMP002', name: 'HR BP User', phoneNumber: '9876543211', email: 'hrbp@hris.com', departmentId: 2, managerId: 1, designation: 'HR Business Partner', dateOfJoining: '2024-02-10', employmentType: 'FULL_TIME', status: 'ACTIVE' },
  { id: 3, employeeId: 'EMP003', name: 'Manager User', phoneNumber: '9876543212', email: 'manager@hris.com', departmentId: 1, managerId: 1, designation: 'Engineering Manager', dateOfJoining: '2024-03-01', employmentType: 'FULL_TIME', status: 'ACTIVE' },
  { id: 4, employeeId: 'EMP004', name: 'Employee User', phoneNumber: '9876543213', email: 'employee@hris.com', departmentId: 1, managerId: 3, designation: 'Software Engineer', dateOfJoining: '2024-05-20', employmentType: 'FULL_TIME', status: 'ACTIVE' },
  { id: 5, employeeId: 'EMP005', name: 'Finance User', phoneNumber: '9876543214', email: 'finance@hris.com', departmentId: 3, managerId: 1, designation: 'Finance Controller', dateOfJoining: '2024-04-12', employmentType: 'FULL_TIME', status: 'ACTIVE' }
];

const SEED_LEAVES = [
  { id: 1, employeeId: 4, leaveType: 'CASUAL', fromDate: '2026-07-20', toDate: '2026-07-21', reason: 'Family event', status: 'PENDING', approvedBy: null },
  { id: 2, employeeId: 4, leaveType: 'SICK', fromDate: '2026-06-10', toDate: '2026-06-11', reason: 'Fever', status: 'APPROVED', approvedBy: 3 }
];

const SEED_PAYROLL = [
  { id: 1, employeeId: 4, payPeriod: '2026-06-30', gross: 80000.00, pfEmployee: 9600.00, esiEmployee: 600.00, tds: 8000.00, netPay: 61800.00, status: 'DISBURSED' },
  { id: 2, employeeId: 3, payPeriod: '2026-06-30', gross: 120000.00, pfEmployee: 14400.00, esiEmployee: 900.00, tds: 15000.00, netPay: 89700.00, status: 'DISBURSED' }
];

const SEED_APPRAISALS = [
  { id: 1, employeeId: 4, cycleYear: 2026, selfRating: 4.00, managerRating: 4.20, finalRating: 4.10, incrementPercentage: 10.00, status: 'CLOSED' },
  { id: 2, employeeId: 3, cycleYear: 2026, selfRating: 4.50, managerRating: null, finalRating: null, incrementPercentage: null, status: 'MANAGER_REVIEW' }
];

// Initialize DB in localStorage if empty
const initDB = () => {
  if (!localStorage.getItem('hris_users')) {
    localStorage.setItem('hris_users', JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem('hris_employees')) {
    localStorage.setItem('hris_employees', JSON.stringify(SEED_EMPLOYEES));
  }
  if (!localStorage.getItem('hris_leaves')) {
    localStorage.setItem('hris_leaves', JSON.stringify(SEED_LEAVES));
  }
  if (!localStorage.getItem('hris_payroll')) {
    localStorage.setItem('hris_payroll', JSON.stringify(SEED_PAYROLL));
  }
  if (!localStorage.getItem('hris_appraisals')) {
    localStorage.setItem('hris_appraisals', JSON.stringify(SEED_APPRAISALS));
  }
};

initDB();

// Helper functions to interact with mock tables
const getUsers = () => JSON.parse(localStorage.getItem('hris_users') || '[]');
const saveUsers = (data) => localStorage.setItem('hris_users', JSON.stringify(data));

const getEmployees = () => JSON.parse(localStorage.getItem('hris_employees') || '[]');
const saveEmployees = (data) => localStorage.setItem('hris_employees', JSON.stringify(data));

const getLeaves = () => JSON.parse(localStorage.getItem('hris_leaves') || '[]');
const saveLeaves = (data) => localStorage.setItem('hris_leaves', JSON.stringify(data));

const getPayroll = () => JSON.parse(localStorage.getItem('hris_payroll') || '[]');
const savePayroll = (data) => localStorage.setItem('hris_payroll', JSON.stringify(data));

const getAppraisals = () => JSON.parse(localStorage.getItem('hris_appraisals') || '[]');
const saveAppraisals = (data) => localStorage.setItem('hris_appraisals', JSON.stringify(data));

// Fetch interceptor utility
const originalFetch = window.fetch;
window.fetch = async function(resource, init) {
  const urlString = typeof resource === 'string' ? resource : resource.url;
  
  if (urlString.startsWith('http://localhost:8080/api/')) {
    const url = new URL(urlString);
    const path = url.pathname.replace(/^\/api/, ''); // remove '/api' prefix
    const method = (init?.method || 'GET').toUpperCase();
    const headers = init?.headers || {};
    let body = null;
    if (init?.body) {
      try {
        body = JSON.parse(init.body);
      } catch (e) {
        body = init.body;
      }
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Extract current user via Bearer token
    const authHeader = headers['Authorization'] || headers['authorization'] || '';
    let currentUser = null;
    if (authHeader.startsWith('Bearer ')) {
      const email = authHeader.replace('Bearer ', '').replace('mock-jwt-token-', '');
      currentUser = getUsers().find(u => u.email === email);
    }
    
    const jsonResponse = (data, status = 200) => {
      return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    };
    
    const errorResponse = (message, status = 400) => {
      return new Response(JSON.stringify({ message }), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    };

    // Routing
    // 1. Auth check email
    if (path.startsWith('/auth/check-email')) {
      const emailParam = url.searchParams.get('email');
      const users = getUsers();
      const exists = users.some(u => u.email === emailParam);
      return jsonResponse({ available: !exists });
    }
    
    // 2. Auth register
    if (path === '/auth/register' && method === 'POST') {
      const users = getUsers();
      if (users.some(u => u.email === body.email)) {
        return errorResponse('Email already registered', 400);
      }
      
      const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      const newUser = {
        id: newUserId,
        name: body.name,
        phoneNumber: body.phoneNumber,
        email: body.email,
        passwordHash: body.password || 'Password123!', // store plain text for simplicity
        role: body.role || 'Employee',
        createdDate: new Date().toISOString(),
        isActive: true
      };
      
      users.push(newUser);
      saveUsers(users);
      
      // Also register corresponding employee profile
      const employees = getEmployees();
      const newEmpIdNum = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      const formattedEmpId = `EMP${String(newEmpIdNum).padStart(3, '0')}`;
      
      const newEmp = {
        id: newEmpIdNum,
        employeeId: formattedEmpId,
        name: body.name,
        phoneNumber: body.phoneNumber,
        email: body.email,
        departmentId: body.role === 'HR BP' ? 2 : (body.role === 'Finance Officer' ? 3 : 1),
        managerId: 1, // Default Admin as manager
        designation: body.designation || 'Associate',
        dateOfJoining: new Date().toISOString().substring(0, 10),
        employmentType: 'FULL_TIME',
        status: 'ACTIVE'
      };
      employees.push(newEmp);
      saveEmployees(employees);
      
      return jsonResponse({ message: 'Registration successful' });
    }
    
    // 3. Auth login
    if (path === '/auth/login' && method === 'POST') {
      const { identifier, password } = body;
      const users = getUsers();
      // login can accept email or phone_number, or we can look up by employee ID
      let user = users.find(u => u.email === identifier || u.phoneNumber === identifier);
      
      if (!user) {
        // Try looking up by Employee ID
        const employees = getEmployees();
        const emp = employees.find(e => e.employeeId === identifier);
        if (emp) {
          user = users.find(u => u.email === emp.email);
        }
      }
      
      if (user && (user.passwordHash === password || password === 'Password123!')) {
        const token = `mock-jwt-token-${user.email}`;
        return jsonResponse({
          token,
          role: user.role,
          name: user.name,
          email: user.email
        });
      }
      
      return errorResponse('Invalid credentials. Please check your email and password.', 401);
    }
    
    // 4. Auth logout
    if (path === '/auth/logout' && method === 'POST') {
      return jsonResponse({ message: 'Logged out successfully' });
    }
    
    // 5. Get Profile
    if (path === '/users/profile' && method === 'GET') {
      if (!currentUser) return errorResponse('Unauthorized', 401);
      return jsonResponse(currentUser);
    }
    
    // 6. Search Employees
    if (path.startsWith('/employees/search') && method === 'GET') {
      if (!currentUser) return errorResponse('Unauthorized', 401);
      const query = (url.searchParams.get('query') || '').toLowerCase();
      const employees = getEmployees();
      const filtered = employees.filter(e => 
        e.name.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query) ||
        e.employeeId.toLowerCase().includes(query) ||
        e.designation.toLowerCase().includes(query)
      );
      return jsonResponse(filtered);
    }
    
    // 7. Create Employee
    if (path === '/employees' && method === 'POST') {
      if (!currentUser || !['Admin', 'HR BP'].includes(currentUser.role)) {
        return errorResponse('Forbidden: HR or Admin only', 403);
      }
      
      const employees = getEmployees();
      if (employees.some(e => e.employeeId === body.employeeId || e.email === body.email)) {
        return errorResponse('Employee ID or Email already exists', 400);
      }
      
      const newEmpId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      const newEmp = {
        id: newEmpId,
        employeeId: body.employeeId,
        name: body.name,
        phoneNumber: body.phoneNumber,
        email: body.email,
        departmentId: 1, // default
        managerId: 1, // default
        designation: body.designation,
        dateOfJoining: body.dateOfJoining,
        employmentType: body.employmentType || 'FULL_TIME',
        status: body.status || 'ACTIVE'
      };
      
      employees.push(newEmp);
      saveEmployees(employees);
      
      // Also automatically create a User account for this employee so they can log in
      const users = getUsers();
      if (!users.some(u => u.email === body.email)) {
        const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({
          id: newUserId,
          name: body.name,
          phoneNumber: body.phoneNumber,
          email: body.email,
          passwordHash: 'Password123!',
          role: 'Employee',
          createdDate: new Date().toISOString(),
          isActive: true
        });
        saveUsers(users);
      }
      
      return jsonResponse(newEmp);
    }
    
    // 8. Analytics attrition
    if (path === '/analytics/attrition' && method === 'GET') {
      if (!currentUser || !['Admin', 'HR BP', 'Finance Officer'].includes(currentUser.role)) {
        return errorResponse('Forbidden', 403);
      }
      return jsonResponse({ attritionRatePercentage: 5.0 });
    }
    
    // 9. Run Payroll
    if (path === '/payroll/run' && method === 'POST') {
      if (!currentUser || !['Admin', 'HR BP', 'Finance Officer'].includes(currentUser.role)) {
        return errorResponse('Forbidden', 403);
      }
      
      const { payPeriod } = body;
      const employees = getEmployees().filter(e => e.status === 'ACTIVE');
      const payrolls = getPayroll();
      
      // Remove any existing payrolls for the same period to overwrite/rerun
      const filteredPayrolls = payrolls.filter(p => p.payPeriod !== payPeriod);
      
      employees.forEach(emp => {
        const gross = emp.designation.toLowerCase().includes('manager') ? 120000.00 : 80000.00;
        const pfEmployee = parseFloat((gross * 0.12).toFixed(2));
        const esiEmployee = parseFloat((gross * 0.0075).toFixed(2));
        const tds = parseFloat((gross * 0.10).toFixed(2));
        const netPay = parseFloat((gross - pfEmployee - esiEmployee - tds).toFixed(2));
        
        const newPayrollId = filteredPayrolls.length > 0 ? Math.max(...filteredPayrolls.map(p => p.id)) + 1 : 1;
        filteredPayrolls.push({
          id: newPayrollId,
          employeeId: emp.id,
          payPeriod,
          gross,
          pfEmployee,
          esiEmployee,
          tds,
          netPay,
          status: 'DISBURSED'
        });
      });
      
      savePayroll(filteredPayrolls);
      return jsonResponse({ message: `Payroll successfully processed for period: ${payPeriod}` });
    }
    
    // 10. Get PF Challan details
    if (path === '/statutory/pf-challan' && method === 'GET') {
      if (!currentUser || !['Admin', 'HR BP', 'Finance Officer'].includes(currentUser.role)) {
        return errorResponse('Forbidden', 403);
      }
      const payrolls = getPayroll();
      if (payrolls.length === 0) {
        return jsonResponse({ period: 'No Period Run', employeeCount: 0, employeeContributionPF: 0, employerContributionPF: 0, totalPFChallanAmount: 0 });
      }
      // Group by latest period
      const periods = [...new Set(payrolls.map(p => p.payPeriod))].sort();
      const latestPeriod = periods[periods.length - 1];
      const latestPayrolls = payrolls.filter(p => p.payPeriod === latestPeriod);
      
      const employeeCount = latestPayrolls.length;
      const employeeContributionPF = parseFloat(latestPayrolls.reduce((sum, p) => sum + p.pfEmployee, 0).toFixed(2));
      const employerContributionPF = employeeContributionPF; // 12% matching
      const totalPFChallanAmount = parseFloat((employeeContributionPF + employerContributionPF).toFixed(2));
      
      return jsonResponse({
        period: latestPeriod,
        employeeCount,
        employeeContributionPF,
        employerContributionPF,
        totalPFChallanAmount
      });
    }
    
    // 11. Get ESI Return details
    if (path === '/statutory/esi-return' && method === 'GET') {
      if (!currentUser || !['Admin', 'HR BP', 'Finance Officer'].includes(currentUser.role)) {
        return errorResponse('Forbidden', 403);
      }
      const payrolls = getPayroll();
      if (payrolls.length === 0) {
        return jsonResponse({ period: 'No Period Run', employeeCount: 0, employeeContributionESI: 0, employerContributionESI: 0, totalESIReturnAmount: 0 });
      }
      const periods = [...new Set(payrolls.map(p => p.payPeriod))].sort();
      const latestPeriod = periods[periods.length - 1];
      const latestPayrolls = payrolls.filter(p => p.payPeriod === latestPeriod);
      
      const employeeCount = latestPayrolls.length;
      const employeeContributionESI = parseFloat(latestPayrolls.reduce((sum, p) => sum + p.esiEmployee, 0).toFixed(2));
      const employerContributionESI = parseFloat((employeeContributionESI * 4.33).toFixed(2));
      const totalESIReturnAmount = parseFloat((employeeContributionESI + employerContributionESI).toFixed(2));
      
      return jsonResponse({
        period: latestPeriod,
        employeeCount,
        employeeContributionESI,
        employerContributionESI,
        totalESIReturnAmount
      });
    }
    
    // 12. Get Payslip
    // Matches '/payroll/:empId/payslip/:month'
    const payslipMatch = path.match(/^\/payroll\/([^/]+)\/payslip\/([^/]+)$/);
    if (payslipMatch && method === 'GET') {
      if (!currentUser) return errorResponse('Unauthorized', 401);
      const empId = payslipMatch[1];
      const month = payslipMatch[2]; // e.g. "2026-07"
      
      const employees = getEmployees();
      const emp = employees.find(e => e.employeeId === empId);
      if (!emp) return errorResponse('Employee profile not found', 404);
      
      const payrolls = getPayroll();
      const payRecord = payrolls.find(p => p.employeeId === emp.id && p.payPeriod.startsWith(month));
      if (!payRecord) return errorResponse('Payslip not found for this period', 404);
      
      return jsonResponse(payRecord);
    }
    
    // 13. Start Appraisals
    if (path === '/appraisals/start' && method === 'POST') {
      if (!currentUser || !['Admin', 'HR BP'].includes(currentUser.role)) {
        return errorResponse('Forbidden', 403);
      }
      
      const { cycleYear } = body;
      const employees = getEmployees().filter(e => e.status === 'ACTIVE');
      const appraisals = getAppraisals();
      
      let initiatedCount = 0;
      employees.forEach(emp => {
        const exists = appraisals.some(a => a.employeeId === emp.id && a.cycleYear === cycleYear);
        if (!exists) {
          const newAppId = appraisals.length > 0 ? Math.max(...appraisals.map(a => a.id)) + 1 : 1;
          appraisals.push({
            id: newAppId,
            employeeId: emp.id,
            cycleYear,
            selfRating: null,
            managerRating: null,
            finalRating: null,
            incrementPercentage: null,
            status: 'SELF_REVIEW'
          });
          initiatedCount++;
        }
      });
      
      saveAppraisals(appraisals);
      return jsonResponse({ message: `Appraisal cycle for ${cycleYear} successfully initiated for ${initiatedCount} active employees.` });
    }
    
    // 14. Get pending / user leaves
    if (path === '/leaves/pending' && method === 'GET') {
      if (!currentUser) return errorResponse('Unauthorized', 401);
      
      const leaves = getLeaves();
      const employees = getEmployees();
      
      let filteredLeaves = [];
      if (['Admin', 'HR BP', 'Manager', 'Dept Head'].includes(currentUser.role)) {
        // Managers see all pending leaves
        filteredLeaves = leaves.filter(l => l.status === 'PENDING');
      } else {
        // Regular employee sees their own leaves
        const emp = employees.find(e => e.email === currentUser.email);
        if (emp) {
          filteredLeaves = leaves.filter(l => l.employeeId === emp.id);
        }
      }
      
      // Map leaves to include employee details
      const populated = filteredLeaves.map(leave => {
        const emp = employees.find(e => e.id === leave.employeeId);
        return {
          ...leave,
          employee: emp ? { name: emp.name } : null
        };
      });
      
      return jsonResponse(populated);
    }
    
    // 15. Apply Leave
    if (path === '/leaves' && method === 'POST') {
      if (!currentUser) return errorResponse('Unauthorized', 401);
      
      const employees = getEmployees();
      const emp = employees.find(e => e.email === currentUser.email);
      if (!emp) return errorResponse('Associated employee profile not found', 400);
      
      const leaves = getLeaves();
      const newLeaveId = leaves.length > 0 ? Math.max(...leaves.map(l => l.id)) + 1 : 1;
      const newLeave = {
        id: newLeaveId,
        employeeId: emp.id,
        leaveType: body.leaveType,
        fromDate: body.fromDate,
        toDate: body.toDate,
        reason: body.reason,
        status: 'PENDING',
        approvedBy: null
      };
      
      leaves.push(newLeave);
      saveLeaves(leaves);
      
      return jsonResponse(newLeave);
    }
    
    // 16. Approve Leave
    const approveLeaveMatch = path.match(/^\/leaves\/([^/]+)\/approve$/);
    if (approveLeaveMatch && method === 'PUT') {
      if (!currentUser || !['Admin', 'HR BP', 'Manager', 'Dept Head'].includes(currentUser.role)) {
        return errorResponse('Forbidden: Managers / Admin only', 403);
      }
      
      const leaveId = parseInt(approveLeaveMatch[1]);
      const leaves = getLeaves();
      const leaveIndex = leaves.findIndex(l => l.id === leaveId);
      
      if (leaveIndex === -1) {
        return errorResponse('Leave application not found', 404);
      }
      
      const approverEmp = getEmployees().find(e => e.email === currentUser.email);
      leaves[leaveIndex].status = body.status; // 'APPROVED' or 'REJECTED'
      leaves[leaveIndex].approvedBy = approverEmp ? approverEmp.id : 1;
      
      saveLeaves(leaves);
      return jsonResponse({ message: `Leave request successfully updated to ${body.status}` });
    }

    return errorResponse(`Endpoint not mocked: ${method} ${path}`, 404);
  }
  
  return originalFetch.apply(this, arguments);
};
