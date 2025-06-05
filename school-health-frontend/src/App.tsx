import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AppLayout from './components/layouts/AppLayout';
import LoginPage from './pages/common/LoginPage';
import DashboardPage from './pages/common/DashboardPage';
import NotificationsPage from './pages/common/NotificationsPage';
import NotFoundPage from './pages/common/NotFoundPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/common/UserProfilePage';

// Admin Pages
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageCampaignsPage from './pages/admin/ManageCampaignsPage';
import CreateVaccinationCampaignPage from './pages/admin/CreateVaccinationCampaignPage'; // New
import ReportsPage from './pages/admin/ReportsPage';
import SystemConfigPage from './pages/admin/SystemConfigPage';

// Y Tá Pages
import ManageMedicineRequestsPage from './pages/yta/ManageMedicineRequestsPage';
import RecordHealthEventPage from './pages/yta/RecordHealthEventPage';
import HealthEventsListPage from './pages/yta/HealthEventsListPage';
import ManageInventoryPage from './pages/yta/ManageInventoryPage';
import InventoryLogPage from './pages/yta/InventoryLogPage';
import ManageVaccinationPage from './pages/yta/ManageVaccinationPage';
import ManageHealthCheckupPage from './pages/yta/ManageHealthCheckupPage';
import SearchStudentRecordsPage from './pages/yta/SearchStudentRecordsPage';

// Phụ Huynh Pages
import StudentHealthProfilePage from './pages/phuhuynh/StudentHealthProfilePage';
import SubmitMedicineRequestPage from './pages/phuhuynh/SubmitMedicineRequestPage';
import CreateMedicineRequestPage from './pages/phuhuynh/CreateMedicineRequestPage';

import { useAuth } from './contexts/AuthContext';
import { VaiTroNguoiDung } from './types';

interface ProtectedRouteProps {
  allowedRoles?: VaiTroNguoiDung[];
}

const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to='/dashboard' replace />;
  }

  return <AppLayout />;
};

const ProtectedPageElement: React.FC<{element: React.ReactElement, allowedRoles?: VaiTroNguoiDung[]}> = ({ element, allowedRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to='/dashboard' replace />;
  }
  return element;
};


function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />

      <Route element={<ProtectedRouteElement />}>
        <Route path='/dashboard' element={<ProtectedPageElement element={<DashboardPage />} />} />
        <Route path='/thong-bao' element={<ProtectedPageElement element={<NotificationsPage />} />} />
        <Route path='/ho-so-ca-nhan' element={<ProtectedPageElement element={<UserProfilePage />} />} />

        {/* Admin Routes */}
        <Route path='/admin/nguoi-dung' element={<ProtectedPageElement element={<ManageUsersPage />} allowedRoles={['admin']} />} />
        <Route path='/admin/chien-dich' element={<ProtectedPageElement element={<ManageCampaignsPage />} allowedRoles={['admin']} />} />
        <Route path='/admin/chien-dich/tiem-chung/tao-moi' element={<ProtectedPageElement element={<CreateVaccinationCampaignPage />} allowedRoles={['admin', 'y_ta']} />} /> {/* New */}
        <Route path='/admin/bao-cao' element={<ProtectedPageElement element={<ReportsPage />} allowedRoles={['admin']} />} />
        <Route path='/admin/cau-hinh' element={<ProtectedPageElement element={<SystemConfigPage />} allowedRoles={['admin']} />} />

        {/* Y Tá Routes */}
        <Route path='/y-ta/yeu-cau-thuoc' element={<ProtectedPageElement element={<ManageMedicineRequestsPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/su-co-y-te/danh-sach' element={<ProtectedPageElement element={<HealthEventsListPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/su-co-y-te' element={<ProtectedPageElement element={<RecordHealthEventPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/kho-thuoc-vat-tu' element={<ProtectedPageElement element={<ManageInventoryPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/kho-thuoc-vat-tu/lich-su-xuat-nhap' element={<ProtectedPageElement element={<InventoryLogPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/tiem-chung' element={<ProtectedPageElement element={<ManageVaccinationPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/kham-suc-khoe' element={<ProtectedPageElement element={<ManageHealthCheckupPage />} allowedRoles={['y_ta', 'admin']} />} />
        <Route path='/y-ta/tra-cuu-hoc-sinh' element={<ProtectedPageElement element={<SearchStudentRecordsPage />} allowedRoles={['y_ta', 'admin']} />} />

        {/* Phụ Huynh Routes */}
        <Route path='/phu-huynh/ho-so-con' element={<ProtectedPageElement element={<StudentHealthProfilePage />} allowedRoles={['phu_huynh', 'admin']} />} />
        <Route path='/phu-huynh/gui-thuoc' element={<ProtectedPageElement element={<SubmitMedicineRequestPage />} allowedRoles={['phu_huynh', 'admin']} />} />
        <Route path='/phu-huynh/gui-thuoc/tao-moi' element={<ProtectedPageElement element={<CreateMedicineRequestPage />} allowedRoles={['phu_huynh', 'admin']} />} />
      </Route>

      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
