import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState('admin');
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'Rizky Pratama',
    email: 'rizky@patigoapp.id',
    initials: 'RP'
  });

  const [members, setMembers] = useState([
    { id: 1, name: 'Rizky Pratama', email: 'rizky@patigoapp.id', initials: 'RP', role: 'admin', joinDate: 'Jan 2026' },
    { id: 2, name: 'Dian Safitri', email: 'dian@patigoapp.id', initials: 'DS', role: 'anggota', joinDate: 'Jan 2026' },
    { id: 3, name: 'Budi Santoso', email: 'budi@patigoapp.id', initials: 'BS', role: 'anggota', joinDate: 'Feb 2026' },
    { id: 4, name: 'Sari Dewi', email: 'sari@patigoapp.id', initials: 'SD', role: 'anggota', joinDate: 'Feb 2026' },
  ]);

  const [pengeluaran, setPengeluaran] = useState([
    { id: 1, judul: 'Sewa Kos Juli', kategori: 'Sewa', total: 6000000, split: 'Sama Rata', tanggal: '2026-07-01', description: 'Termasuk biaya kebersihan' },
    { id: 2, judul: 'Belanja Bulanan', kategori: 'Makanan', total: 450000, split: 'Sama Rata', tanggal: '2026-07-05', description: '' },
    { id: 3, judul: 'Netflix + Spotify', kategori: 'Hiburan', total: 95000, split: 'Sama Rata', tanggal: '2026-07-06', description: '' },
    { id: 4, judul: 'Tagihan Listrik', kategori: 'Utilitas', total: 520000, split: 'Sama Rata', tanggal: '2026-07-08', description: '' }
  ]);

  const [tagihan, setTagihan] = useState([
    { id: 101, memberId: 1, pengeluaranId: 1, amount: 1500000, status: 'Lunas' },
    { id: 102, memberId: 2, pengeluaranId: 1, amount: 1500000, status: 'Lunas' },
    { id: 103, memberId: 3, pengeluaranId: 1, amount: 1500000, status: 'Belum Lunas' },
    { id: 104, memberId: 4, pengeluaranId: 1, amount: 1500000, status: 'Lunas' },
    { id: 105, memberId: 1, pengeluaranId: 2, amount: 150000, status: 'Lunas' },
    { id: 106, memberId: 2, pengeluaranId: 2, amount: 150000, status: 'Lunas' },
    { id: 107, memberId: 3, pengeluaranId: 2, amount: 150000, status: 'Lunas' },
    { id: 108, memberId: 4, pengeluaranId: 2, amount: 150000, status: 'Belum Lunas' },
  ]);

  const [aktivitas, setAktivitas] = useState([
    { id: 1, type: 'Pembayaran', title: 'Dian Safitri membayar Netflix + Spotify', amount: 15833, time: '2 jam lalu' },
    { id: 2, type: 'Tagihan', title: 'Rizky Pratama menambahkan tagihan Iuran Gym', amount: 300000, time: '5 jam lalu' },
    { id: 3, type: 'Pembayaran', title: 'Maya Rahayu membayar Tagihan Listrik', amount: 86666, time: 'Kemarin' },
    { id: 4, type: 'Pengingat', title: 'Sistem mengirim pengingat kepada Sari Dewi', time: 'Kemarin' },
    { id: 5, type: 'Tagihan', title: 'Budi Santoso menambahkan tagihan Belanja Bulanan', amount: 450000, time: '3 hari lalu' },
    { id: 6, type: 'Pembayaran', title: 'Andi Kurniawan membayar Makan Malam', amount: 260000, time: '4 hari lalu' },
  ]);
  
  const monthlyData = [
    { name: 'Feb', Lunas: 7500000, Belum: 0, Total: 7500000 },
    { name: 'Mar', Lunas: 7800000, Belum: 0, Total: 7800000 },
    { name: 'Apr', Lunas: 7100000, Belum: 0, Total: 7100000 },
    { name: 'Mei', Lunas: 8400000, Belum: 0, Total: 8400000 },
    { name: 'Jun', Lunas: 8100000, Belum: 0, Total: 8100000 },
    { name: 'Jul', Lunas: 6500000, Belum: 2000000, Total: 8500000 },
  ];

  const switchRole = (newRole, userId) => {
    setRole(newRole);
    const user = members.find(m => m.id === userId);
    if(user) setCurrentUser(user);
  };

  const value = {
    role,
    currentUser,
    members,
    pengeluaran,
    tagihan,
    aktivitas,
    monthlyData,
    switchRole,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
