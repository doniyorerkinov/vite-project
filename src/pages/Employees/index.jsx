import React, { useState, useEffect } from 'react';
import Table from '../../components/Base/Table';
import Breadcrumbs from '../../components/Breadcumbs';
import ApiService from '../../services/ApiService'; // Import the ApiService

const Employees = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch employees using ApiService
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await ApiService.get('/users'); // Pass the endpoint
      setTableData(data.users); // Extract the users array from the response
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add a new employee using ApiService
  const handleAdd = async () => {
    const firstName = prompt('Enter first name:');
    if (!firstName) return;

    const lastName = prompt('Enter last name:');
    if (!lastName) return;

    const email = prompt('Enter email:');
    if (!email) return;

    try {
      const newUser = await ApiService.post('/users/add', { firstName, lastName, email }); // Pass endpoint and data
      setTableData((prev) => [...prev, newUser]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  // Update an employee using ApiService
  const handleEdit = async (rowData) => {
    const newFirstName = prompt('Enter new first name:', rowData.firstName);
    if (!newFirstName || newFirstName === rowData.firstName) return;

    try {
      const updatedUser = await ApiService.put(`/users/${rowData.id}`, { firstName: newFirstName }); // Pass endpoint and data
      setTableData((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  // Delete an employee using ApiService
  const handleDelete = async (rowData) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const deletedUser = await ApiService.delete(`/users/${rowData.id}`); // Pass the endpoint
        setTableData((prev) => prev.filter((user) => user.id !== deletedUser.id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  // Handle row click
  const handleRowClick = (rowData) => {
    console.log('Row clicked:', rowData);
  };

  // Define table headers and keys
  const headers = ['First Name', 'Last Name', 'Email'];
  const keys = ['firstName', 'lastName', 'email'];

  // Define actions for each row
  const actions = [
    { label: 'Edit', onClick: handleEdit },
    { label: 'Delete', onClick: handleDelete },
  ];

  return (
    <div className="">
      <Breadcrumbs>
        <button
          className="bg-primary-green text-white px-4 py-2 rounded hover:bg-primary-green/80 cursor-pointer"
          onClick={handleAdd}
        >
          Add Employee
        </button>
      </Breadcrumbs>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headers={headers}
          keys={keys}
          data={tableData}
          actions={actions}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  );
};

export default Employees;