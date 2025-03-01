import React from 'react';

const Table = ({ headers, keys, data, onRowClick, actions = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-primary-bg">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 text-left font-medium text-gray-700"
              >
                {header}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-4 py-2 text-left font-medium text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-100 cursor-pointer"
              onClick={() => onRowClick(row)}
            >
              {headers.map((header, index) => {
                const key = keys ? keys[index] : header.toLowerCase();
                const value = row[key];

                // Check if the value exists and render accordingly
                return (
                  <td key={index} className="px-4 py-2">
                    {value !== undefined && value !== null ? (
                      // Render the actual value
                      value
                    ) : (
                      // Fallback for missing values
                      <span className="text-gray-500 italic">N/A</span>
                    )}
                  </td>
                );
              })}
              {actions.length > 0 && (
                <td className="px-4 py-2 flex items-center gap-2">
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
