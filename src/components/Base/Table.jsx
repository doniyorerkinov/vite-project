import React from 'react';

const Table = ({ headers, keys, data, onRowClick, actions = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 text-left font-medium text-gray-700">
                {header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-2 text-left font-medium text-gray-700">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onRowClick(row)}
            >
              {headers.map((header, index) => (
                <td key={index} className="px-4 py-2">
                  {row[keys ? keys[index] : header.toLowerCase()]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className="px-4 py-2">
                  {actions.map((action, aIndex) => (
                    <button
                      key={aIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
