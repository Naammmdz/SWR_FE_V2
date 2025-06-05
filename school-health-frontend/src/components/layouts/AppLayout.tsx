import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } // For rendering nested routes
from 'react-router-dom';

const AppLayout: React.FC = () => {
  // Dummy user role for now - this will come from auth context later
  const userRole = 'y_ta'; // Possible values: 'admin', 'y_ta', 'phu_huynh'

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar userRole={userRole} />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header userRole={userRole} />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6'>
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
