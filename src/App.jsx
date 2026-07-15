import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';

// Admin Pages
import { DashboardAdmin } from './pages/admin/DashboardAdmin';
import { Anggota } from './pages/admin/Anggota';
import { Pengeluaran } from './pages/admin/Pengeluaran';
import { Tagihan } from './pages/admin/Tagihan';
import { Verifikasi } from './pages/admin/Verifikasi';
import { Pelacakan } from './pages/admin/Pelacakan';
import { Laporan } from './pages/admin/Laporan';
import { Aktivitas } from './pages/admin/Aktivitas';
import { Pengaturan } from './pages/admin/Pengaturan';

// Anggota Pages
import { DashboardAnggota } from './pages/anggota/DashboardAnggota';
import { TagihanAnggota } from './pages/anggota/TagihanAnggota';
import { RiwayatAnggota } from './pages/anggota/RiwayatAnggota';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Jalur Publik / Auth (Tanpa Sidebar/Navbar) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 2. Jalur Aplikasi Utama (Menggunakan AppLayout) */}
          <Route path="/" element={<AppLayout />}>
            {/* Redirect otomatis dari Halaman Utama ke Dashboard Admin */}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            
            {/* Admin Routes */}
            <Route path="admin/dashboard" element={<DashboardAdmin />} />
            <Route path="admin/anggota" element={<Anggota />} />
            <Route path="admin/pengeluaran" element={<Pengeluaran />} />
            <Route path="admin/tagihan" element={<Tagihan />} />
            <Route path="admin/verifikasi" element={<Verifikasi />} />
            <Route path="admin/pelacakan" element={<Pelacakan />} />
            <Route path="admin/laporan" element={<Laporan />} />
            <Route path="admin/aktivitas" element={<Aktivitas />} />
            
            {/* Pengaturan (Shared) */}
            <Route path="pengaturan" element={<Pengaturan />} />
            
            {/* Anggota Routes */}
            <Route path="anggota/dashboard" element={<DashboardAnggota />} />
            <Route path="anggota/tagihan" element={<TagihanAnggota />} />
            <Route path="anggota/riwayat" element={<RiwayatAnggota />} />
            <Route path="anggota/profil" element={<Pengaturan />} />
            
            {/* Fallback jika route di dalam layout salah ketik */}
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Fallback Global jika user mengetik asal di URL terluar */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;