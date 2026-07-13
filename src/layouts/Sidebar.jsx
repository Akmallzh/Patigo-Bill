import React from 'react';
import { NavLink } from 'react-router-dom';
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
  Activity
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';

export function Sidebar() {
  const { role, currentUser, switchRole } = useAppContext();

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

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl mb-3 cursor-pointer hover:bg-slate-100 transition" onClick={() => switchRole(role === 'admin' ? 'anggota' : 'admin', role === 'admin' ? 2 : 1)}>
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
            {currentUser.initials}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-800 truncate">{currentUser.name}</h4>
            <p className="text-xs text-slate-500 truncate capitalize">{role} Kelompok (Klik ganti)</p>
          </div>
        </div>
        
        <NavLink
          to="/pengaturan"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Pengaturan
        </NavLink>
      </div>
    </aside>
  );
}
