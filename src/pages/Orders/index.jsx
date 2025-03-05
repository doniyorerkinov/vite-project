'use client';
import { useState, useEffect } from 'react';
import Table from '../../components/Base/Table';
import Breadcrumbs from '../../components/Breadcumbs';
import Pagination from '../../components/Base/Pagination';
import Search from '../../components/Base/Search';
import Calendar from '../../components/Base/Calendar';
import DetailsModal from './DetailsModal';
const Orders = () => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState({
    id: 776,
    total_quantity: 2,
    total_price: 35000,
    mane_ball: 1.75,
    status: 'Cancelled', // Order Status
    main_status: 'Cancelled', // IIKO Status
    delivery_status: 'cancelled', // Yandex Status
    payment_status: 'Cancelled', // Payment Status
    payment_method: 'Cash', // Payment Method
    error_reason: '',
    created_at: '2024-07-03 14:56:25',
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const limit = 10;

  // Static orders data with translations
  const ordersData = [
    {
      id: 776,
      total_quantity: 2,
      total_price: 35000,
      mane_ball: 1.75,
      status: 'Cancelled', // Order Status
      main_status: 'Cancelled', // IIKO Status
      delivery_status: 'cancelled', // Yandex Status
      payment_status: 'Cancelled', // Payment Status
      payment_method: 'Cash', // Payment Method
      error_reason: '',
      created_at: '2024-07-03 14:56:25',
    },
    {
      id: 775,
      total_quantity: 2,
      total_price: 30000,
      mane_ball: 1.5,
      status: 'New',
      main_status: 'WaitCooking',
      delivery_status: 'cancelled_with_payment',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-07-02 14:56:25',
    },
    {
      id: 772,
      total_quantity: 1,
      total_price: 15000,
      mane_ball: 0.75,
      status: 'New',
      main_status: 'WaitCooking',
      delivery_status: 'new',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-07-01 10:00:00',
    },
    {
      id: 744,
      total_quantity: 1,
      total_price: 25000,
      mane_ball: 1.25,
      status: 'New',
      main_status: 'CookingCompleted',
      delivery_status: 'new',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-30 09:30:00',
    },
    {
      id: 743,
      total_quantity: 1,
      total_price: 25000,
      mane_ball: 1.25,
      status: 'New',
      main_status: 'New',
      delivery_status: 'new',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-29 15:20:00',
    },
    {
      id: 742,
      total_quantity: 1,
      total_price: 25000,
      mane_ball: 1.25,
      status: 'New',
      main_status: 'New',
      delivery_status: 'new',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-28 11:45:00',
    },
    {
      id: 741,
      total_quantity: 1,
      total_price: 25000,
      mane_ball: 1.25,
      status: 'New',
      main_status: 'New',
      delivery_status: 'new',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-27 16:10:00',
    },
    {
      id: 726,
      total_quantity: 1,
      total_price: 15000,
      mane_ball: 0.75,
      status: 'New',
      main_status: 'WaitCooking',
      delivery_status: 'new',
      payment_status: 'Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-26 13:00:00',
    },
    {
      id: 725,
      total_quantity: 1,
      total_price: 20000,
      mane_ball: 1,
      status: 'New',
      main_status: 'CookingCompleted',
      delivery_status: 'new',
      payment_status: 'Not Paid',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-25 08:30:00',
    },
    {
      id: 724,
      total_quantity: 1,
      total_price: 15000,
      mane_ball: 0.75,
      status: 'Cancelled',
      main_status: 'Cancelled',
      delivery_status: 'cancelled',
      payment_status: 'Cancelled',
      payment_method: 'Cash',
      error_reason: '',
      created_at: '2024-06-24 12:00:00',
    },
  ];

  useEffect(() => {
    // Filter static orders based on search query and date range
    let filteredOrders = ordersData;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filteredOrders = filteredOrders.filter((order) => {
        return (
          order.id.toString().includes(searchLower) ||
          order.status.toLowerCase().includes(searchLower) ||
          order.main_status.toLowerCase().includes(searchLower) ||
          order.delivery_status.toLowerCase().includes(searchLower) ||
          order.payment_status.toLowerCase().includes(searchLower) ||
          (order.payment_method &&
            order.payment_method.toLowerCase().includes(searchLower))
        );
      });
    }

    if (dateRange.startDate && dateRange.endDate) {
      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = new Date(order.created_at);
        return (
          orderDate >= dateRange.startDate && orderDate <= dateRange.endDate
        );
      });
    }

    setTotalRecords(filteredOrders.length);
    const skip = (currentPage - 1) * limit;
    const paginatedOrders = filteredOrders.slice(skip, skip + limit);
    setTableData(paginatedOrders);
  }, [currentPage, searchQuery, dateRange]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Calendar returns an array of two dates; update dateRange accordingly
  const handleDateRangeChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      setDateRange({
        startDate: dates[0].toDate(),
        endDate: dates[1].toDate(),
      });
    } else {
      setDateRange({
        startDate: null,
        endDate: null,
      });
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Updated table headers and keys with English labels
  const headers = [
    'ID',
    'Quantity',
    'Total Price',
    'Mane Ball',
    'Order Status',
    'IIKO Status',
    'Yandex Status',
    'Payment Status',
    'Payment Method',
    'Error Reason',
  ];
  const keys = [
    'id',
    'total_quantity',
    'total_price',
    'mane_ball',
    'status',
    'main_status',
    'delivery_status',
    'payment_status',
    'payment_method',
    'error_reason',
  ];

  function handleRowClick(rowData) {
    setCurrentOrder(rowData);
    setIsModalOpen(true);
  }
  return (
    <div>
      <Breadcrumbs>
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Search Component */}
          <Search onSearch={handleSearch} placeholder="Search orders..." />

          {/* Date Range Picker */}
          <Calendar
            type="range"
            displayFormat="DD/MM/YYYY"
            onChange={handleDateRangeChange}
          />
        </div>
      </Breadcrumbs>

      <Table
        headers={headers}
        keys={keys}
        data={tableData}
        onRowClick={(rowData) => handleRowClick(rowData)}
      />

      <div className="flex justify-between items-center mb-4 bg-white p-4">
        <span className="text-gray-700">
          {Math.min((currentPage - 1) * limit + 1, totalRecords)}-
          {Math.min(currentPage * limit, totalRecords)} of {totalRecords} Orders
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalRecords / limit)}
          onPageChange={handlePageChange}
        />
      </div>
      <DetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        detail={currentOrder}
      />
    </div>
  );
};

export default Orders;
