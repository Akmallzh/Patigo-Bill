import React from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { useAppContext } from '../../context/AppContext';

export function DashboardAnggota() {
  const { role, currentUser } = useAppContext();
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard Anggota</h2>
        <p className="text-slate-500 mt-1">Halo, {currentUser.name}. Anda login sebagai {role}.</p>
      </div>
      
      <Card>
        <CardContent>
          <p className="text-slate-600">Gunakan tombol profil di sidebar kiri bawah untuk mengganti role kembali ke Admin dan melihat halaman Pelacakan Utang.</p>
        </CardContent>
      </Card>
    </div>
  );
}
