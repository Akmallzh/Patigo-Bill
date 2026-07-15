import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // <-- Tambahkan useNavigate
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  CheckSquare, 
  TrendingUp, 
  PieChart, 
  Settings, 
  Wallet, 
  History, 
  UserCircle,
  Activity,
  LogOut // <-- 1. Impor icon LogOut
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';

export function Sidebar() {
  const { role, currentUser, switchRole } = useAppContext();
  const navigate = useNavigate(); // <-- 2. Hook untuk pindah halaman

  const handleLogout = () => {
    // Di sini nanti tempat hapus token/session jika sudah pakai serverless backend
    // Untuk sekarang, langsung tendang ke halaman login
    navigate('/login');
  };

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Anggota', icon: Users, path: '/admin/anggota' },
    { name: 'Pengeluaran', icon: FileText, path: '/admin/pengeluaran' },
    { name: 'Tagihan', icon: CreditCard, path: '/admin/tagihan' },
    { name: 'Verifikasi Pembayaran', icon: CheckSquare, path: '/admin/verifikasi' },
    { name: 'Pelacakan Utang', icon: TrendingUp, path: '/admin/pelacakan' },
    { name: 'Laporan', icon: PieChart, path: '/admin/laporan' },
    { name: 'Aktivitas', icon: Activity, path: '/admin/aktivitas' },
  ];

  const anggotaLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/anggota/dashboard' },
    { name: 'Tagihan Saya', icon: Wallet, path: '/anggota/tagihan' },
    { name: 'Riwayat Pembayaran', icon: History, path: '/anggota/riwayat' },
    { name: 'Profil', icon: UserCircle, path: '/anggota/profil' },
  ];

  const links = role === 'admin' ? adminLinks : anggotaLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen overflow-y-auto hidden md:flex shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-slate-900 leading-tight">Patigo Bill</h1>
          <p className="text-xs text-slate-500">Kelompok Kos Harmoni</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Bagian Bawah Sidebar (Profil & Aksi) */}
      <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0">
        {/* Toggle Switch Role */}
        <div 
          className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl mb-2 cursor-pointer transition border border-slate-100" 
          onClick={() => switchRole(role === 'admin' ? 'anggota' : 'admin', role === 'admin' ? 2 : 1)}
          title="Klik untuk simulasi ganti akun/role"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
            {currentUser.initials}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-xs font-semibold text-slate-800 truncate">{currentUser.name}</h4>
            <p className="text-[10px] text-slate-500 truncate capitalize font-medium">Role: {role} ⇄</p>
          </div>
        </div>
        
        {/* Navigasi Pengaturan */}
        <NavLink
          to="/pengaturan"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1",
              isActive ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"
            )
          }
        >
          <Settings className="w-5 h-5 text-slate-400" />
          Pengaturan
        </NavLink>

        {/* 3. Tombol Logout Baru */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 text-left"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Keluar Akun
        </button>
      </div>
    </aside>
  );
}