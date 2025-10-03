// Example Employee Data
let employees = [
    { id: 1, name: 'John Doe', attendance: false, payroll: 0 },
    { id: 2, name: 'Jane Smith', attendance: false, payroll: 0 },
    { id: 3, name: 'Michael Johnson', attendance: false, payroll: 0 },
  ];
  
  // Load Employees in Employee Section and Dropdowns
  document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
  });
  
  // Function to  load employees dynamically
  function loadEmployees() {
    const employeeList = document.querySelector('.employee-list');
    const attendanceSelect = document.querySelector('#employee-attendance');
    const payrollSelect = document.querySelector('#employee-payroll');
  
    // Clear existing data
    employeeList.innerHTML = '';
    attendanceSelect.innerHTML = '';
    payrollSelect.innerHTML = '';
  
    // Populate employee list and dropdowns
    employees.forEach((employee) => {
      // Create div for employee in list
      const employeeDiv = document.createElement('div');
      employeeDiv.textContent = employee.name;
      employeeList.appendChild(employeeDiv);
  
      // Add options to attendance and payroll dropdowns
      const attendanceOption = document.createElement('option');
      attendanceOption.value = employee.id;
      attendanceOption.textContent = employee.name;
      attendanceSelect.appendChild(attendanceOption);
  
      const payrollOption = document.createElement('option');
      payrollOption.value = employee.id;
      payrollOption.textContent = employee.name;
      payrollSelect.appendChild(payrollOption);
    });
  }
  
  // Add new employee functionality
  document.getElementById('add-employee-btn').addEventListener('click', () => {
    const newEmployeeName = document.getElementById('new-employee-name').value.trim();
  
    if (newEmployeeName) {
      // Add new employee to the list
      const newEmployee = { id: employees.length + 1, name: newEmployeeName, attendance: false, payroll: 0 };
      employees.push(newEmployee);
  
      // Reload employees to refresh UI
      loadEmployees();
      document.getElementById('new-employee-name').value = '';  // Clear input field
      alert(`Employee ${newEmployeeName} has been added.`);
    } else {
      alert('Please enter a valid employee name.');
    }
  });
  
  // Attendance Tracking functionality
  document.getElementById('mark-attendance-btn').addEventListener('click', () => {
    const selectedEmployeeId = document.getElementById('employee-attendance').value;
  
    // Find employee by ID and mark attendance
    const employee = employees.find(emp => emp.id == selectedEmployeeId);
    
    if (employee) {
      employee.attendance = true;
      alert(`Attendance marked for ${employee.name}.`);
    } else {
      alert('Please select a valid employee.');
    }
  });
  
  // Payroll Processing functionality
  document.getElementById('generate-payroll-btn').addEventListener('click', () => {
    const selectedEmployeeId = document.getElementById('employee-payroll').value;
  
    // Find employee by ID and generate payroll
    const employee = employees.find(emp => emp.id == selectedEmployeeId);
  
    if (employee) {
      const salary = prompt(`Enter salary for ${employee.name}:`, "0");
  
      // Check if salary is a valid number
      if (!isNaN(salary) && salary > 0) {
        employee.payroll = Number(salary);
        alert(`Payroll of ${salary} generated for ${employee.name}.`);
      } else {
        alert('Please enter a valid salary.');
      }
    } else {
      alert('Please select a valid employee.');
    }
  });
  
  // Download employee information in Word format (for privacy reasons)
  document.getElementById('download-info-btn').addEventListener('click', () => {
    // Prepare employee data for download
    const content = employees.map((emp) => `Name: ${emp.name}\nAttendance: ${emp.attendance ? 'Present' : 'Absent'}\nPayroll: ${emp.payroll}\n`).join('\n');
    
    // Create a blob for the Word document
    const blob = new Blob([content], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employee_information.doc';
    
    // Trigger download
    link.click();
  });

  
