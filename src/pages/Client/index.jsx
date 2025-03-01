'use client';

import { useState, useEffect } from 'react';
import Table from '../../components/Base/Table';
import Breadcrumbs from '../../components/Breadcumbs';
import ApiService from '../../services/ApiService';
import Pagination from '../../components/Base/Pagination';
import ClientEdit from './Edit';
import { Edit, Plus, Trash } from 'lucide-react';
import Loader from '../../components/Base/Loader';

const Clients = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  const limit = 10;

  const fetchEmployees = async (page) => {
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const data = await ApiService.get(`/users?limit=${limit}&skip=${skip}`);
      setTableData(data.users);
      setTotalRecords(data.total);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]); // Removed fetchEmployees from dependencies

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAdd = () => {
    setCurrentClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (client) => {
    setCurrentClient(client);
    setIsModalOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      if (currentClient) {
        // Edit existing client
        const updatedClient = await ApiService.put(
          `/users/${currentClient.id}`,
          formData
        );
        setTableData((prev) =>
          prev.map((client) =>
            client.id === currentClient.id ? updatedClient : client
          )
        );
      } else {
        // Add new client
        const newClient = await ApiService.post('/users/add', formData);
        setTableData((prev) => [...prev, newClient]);
      }
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  const headers = ['Client Name', 'Birth Date', 'Phone', 'Role', 'Rating'];
  const keys = ['firstName', 'birthDate', 'phone', 'role', 'rating'];

  const actions = [
    {
      label: <Edit className="text-primary-green" size={20} />,
      onClick: (rowData) => handleEdit(rowData),
    },
    {
      label: <Trash className="text-red-500" size={20} />,
      onClick: async (rowData) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
          try {
            await ApiService.delete(`/users/${rowData.id}`);
            setTableData((prev) =>
              prev.filter((client) => client.id !== rowData.id)
            );
          } catch (error) {
            console.error('Error deleting client:', error);
          }
        }
      },
    },
  ];

  const totalPages = Math.ceil(totalRecords / limit);

  return (
    <div>
      <Breadcrumbs>
        <button
          className="bg-primary-green !text-white flex items-center gap-4 px-4 py-2 rounded hover:bg-primary-green/80 cursor-pointer"
          onClick={handleAdd}
        >
          <Plus size={20} />
          Add Client
        </button>
      </Breadcrumbs>

      {loading ? (
        <div className="min-h-60 w-full flex justify-center items-center scale-150">
          <Loader />
        </div>
      ) : (
        <>
          <Table
            headers={headers}
            keys={keys}
            data={tableData}
            actions={actions}
            onRowClick={(rowData) => console.log('Row clicked:', rowData)}
          />
        </>
      )}

      <div className="flex justify-between items-center mb-4 bg-white p-4">
        <span className="text-gray-700">
          {Math.min((currentPage - 1) * limit + 1, totalRecords)}-
          {Math.min(currentPage * limit, totalRecords)} of {totalRecords}{' '}
          Clients
        </span>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <ClientEdit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        client={currentClient}
        onSave={handleSave}
      />
    </div>
  );
};

export default Clients;
