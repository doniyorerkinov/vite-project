'use client';
import { useState, useEffect } from 'react';
import Table from '../../components/Base/Table';
import Breadcrumbs from '../../components/Breadcumbs';
import ApiService from '../../services/ApiService';
import Pagination from '../../components/Base/Pagination';
import EmployeeEdit from './Edit';
import Search from '../../components/Base/Search';
import Calendar from '../../components/Base/Calendar';
import { Edit, Plus, Trash } from 'lucide-react';

const Employees = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const limit = 10;

  // Fetch employees using ApiService with pagination, search, and date range
  const fetchEmployees = async (
    page,
    search = '',
    startDate = null,
    endDate = null
  ) => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      let url = `/users?limit=${limit}&skip=${skip}`;

      if (search) {
        url += `&q=${search}`;
      }

      if (startDate && endDate) {
        url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      }

      const data = await ApiService.get(url);
      setTableData(data.users);
      setTotalRecords(data.total);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(
      currentPage,
      searchQuery,
      dateRange.startDate,
      dateRange.endDate
    );
  }, [currentPage, searchQuery, dateRange]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setCurrentPage(1); // Reset to first page when changing date range
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      const newUser = await ApiService.post('/users/add', {
        firstName,
        lastName,
        email,
      });
      setTableData((prev) => [...prev, newUser]);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  // Define table headers and keys
  const headers = ['Employee Name', 'Birth Date', 'Phone', 'Role', 'Rating'];
  const keys = ['firstName', 'birthDate', 'phone', 'role', 'rating'];

  // Define actions for each row
  const actions = [
    {
      label: <Edit className="text-primary-green" size={20} />,
      onClick: (rowData) => openEditModal(rowData),
    },
    {
      label: <Trash className="text-red-500" size={20} />,
      onClick: (rowData) => console.log('Delete:', rowData),
    },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / limit);

  const openAddModal = () => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSaveEmployee = (formData) => {
    console.log(formData);
  };

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1:
        return 'Администратор';
      case 2:
        return 'Менеджер';
      case 3:
        return 'Сотрудник';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div>
      <Breadcrumbs>
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Search Component */}
          <Search onSearch={handleSearch} placeholder="Search employees..." />

          {/* Date Range Picker */}
          <Calendar
            type={'range'}
            displayFormat="DD/MM/YYYY"
            onChange={handleDateRangeChange}
          />
          {/* Add Employee Button */}
          <button
            className="bg-primary-green !text-white px-4 py-2 rounded-lg hover:bg-primary-green/80 cursor-pointer flex items-center gap-4 w-fit"
            onClick={openAddModal}
          >
            <Plus />
            Add Employee
          </button>
        </div>
      </Breadcrumbs>

      {loading ? (
        <div className="min-h-60">
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
          {Math.min(currentPage * limit, totalRecords)} of {totalRecords}{' '}
          Employees
        </span>
        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Employee Edit Modal */}
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
