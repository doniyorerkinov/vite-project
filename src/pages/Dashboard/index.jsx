import React from 'react';
import DashboardCard from '../../components/UI/DashboardCard';
import { Home, Settings, Users, FileText, BarChart2 } from 'lucide-react';

function Dashboard() {
  // Array of card data
  const cards = [
    { url: '/home', icon: <Home className="size-40" />, title: 'Home' },
    {
      url: '/settings',
      icon: <Settings className="size-40" />,
      title: 'Settings',
    },
    { url: '/users', icon: <Users className="size-40" />, title: 'Users' },
    {
      url: '/reports',
      icon: <FileText className="size-40" />,
      title: 'Reports',
    },
    {
      url: '/analytics',
      icon: <BarChart2 className="size-40" />,
      title: 'Analytics',
    },
  ];

  return (
    <div className="w-full">
      {/* Responsive container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {/* Map over the cards array */}
          {cards.map((card, index) => (
            <DashboardCard
              key={index} // Use index as the key (or a unique identifier if available)
              url={card.url}
              icon={card.icon}
              title={card.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
