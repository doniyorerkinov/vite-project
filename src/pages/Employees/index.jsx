import React, { useState, useEffect } from 'react';
import Table from '../../components/Base/Table';
import Breadcrumbs from '../../components/Breadcumbs';
import ApiService from '../../services/ApiService'; 
import Pagination from '../../components/Base/Pagination';
import EmployeeEdit from './Edit'

const Employees = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const limit = 10; // Number of records per page

  // Fetch employees using ApiService with pagination
  const fetchEmployees = async (page) => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit; // Calculate the skip value based on the current page
      const data = await ApiService.get(`/users?limit=${limit}&skip=${skip}`);
      setTableData(data.users); // Extract the users array from the response
      setTotalRecords(data.total); // Set the total number of records
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage); // Fetch data for the current page
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  // Add a new employee using ApiService
  const handleAdd = async () => {
    const firstName = prompt('Enter first name:');
    if (!firstName) return;
    const lastName = prompt('Enter last name:');
    if (!lastName) return;
    const email = prompt('Enter email:');
    if (!email) return;

    try {
      const newUser = await ApiService.post('/users/add', { firstName, lastName, email });
      setTableData((prev) => [...prev, newUser]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  // Define table headers and keys
  const headers = ['Employee Name', 'Birth Date', 'Phone', 'Role', 'Rating'];
  const keys = ['firstName',  'birthDate', 'phone', 'role', 'rating'];

  // Define actions for each row
  const actions = [
    { label: 'Edit', onClick: (rowData) => console.log('Edit:', rowData) },
    { label: 'Delete', onClick: (rowData) => console.log('Delete:', rowData) },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / limit);


  const openAddModal = () => {
    setCurrentEmployee(null)
    setIsModalOpen(true)
  }

  const openEditModal = (employee) => {
    setCurrentEmployee(employee)
    setIsModalOpen(true)
  }

  const handleSaveEmployee = (formData) => {
    console.log(formData);
    
  }

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return "Администратор"
      case 2:
        return "Менеджер"
      case 3:
        return "Сотрудник"
      default:
        return "Неизвестно"
    }
  }
  return (
    <div>
      <Breadcrumbs>
        <button
          className="bg-primary-green text-white px-4 py-2 rounded hover:bg-primary-green/80 cursor-pointer"
          onClick={openAddModal}
        >
          Add Employee
        </button>
      </Breadcrumbs>

      {loading ? (
        <div className='min-h-60'>
        <p>Loading...</p>
        </div>  
      ) : (
        <>
            {/* Table */}
            <Table
              headers={headers}
              keys={keys}
              data={tableData}
              actions={actions}
              onRowClick={(rowData) => console.log('Row clicked:', rowData)}
            />

        </>
      )}
          {/* Showing X of Y items */}
          <div className="flex justify-between items-center mb-4 bg-white p-4">
            <span className="text-gray-700">
              {Math.min((currentPage - 1) * limit + 1, totalRecords)}-
              {Math.min(currentPage * limit, totalRecords)} of {totalRecords} Employees
            </span>

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <EmployeeEdit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={currentEmployee}
        onSave={handleSaveEmployee}
      />
    </div>
  );
};

export default Employees;