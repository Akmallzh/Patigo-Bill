import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { DashboardAdmin } from './pages/admin/DashboardAdmin';
import { Anggota } from './pages/admin/Anggota';
import { Tagihan } from './pages/admin/Tagihan';
import { Pelacakan } from './pages/admin/Pelacakan';
import { Laporan } from './pages/admin/Laporan';
import { Aktivitas } from './pages/admin/Aktivitas';
import { Pengaturan } from './pages/admin/Pengaturan';
import { DashboardAnggota } from './pages/anggota/DashboardAnggota';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<DashboardAdmin />} />
            <Route path="admin/anggota" element={<Anggota />} />
            <Route path="admin/tagihan" element={<Tagihan />} />
            <Route path="admin/pelacakan" element={<Pelacakan />} />
            <Route path="admin/laporan" element={<Laporan />} />
            <Route path="admin/aktivitas" element={<Aktivitas />} />
            
            {/* Pengaturan (Shared but placed here for simplicity) */}
            <Route path="pengaturan" element={<Pengaturan />} />
            
            {/* Anggota Routes (Placeholder functionality for now) */}
            <Route path="anggota/dashboard" element={<DashboardAnggota />} />
            <Route path="anggota/tagihan" element={<DashboardAnggota />} />
            <Route path="anggota/riwayat" element={<DashboardAnggota />} />
            <Route path="anggota/profil" element={<Pengaturan />} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
