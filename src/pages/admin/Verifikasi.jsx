import React from 'react';
import { Check, X, ShieldAlert, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { formatRupiah } from '../../utils/format';

export function Verifikasi() {
  // Dummy data pengajuan pembayaran dari anggota
  const pendingApprovals = [
    { id: 1, name: 'Budi Santoso', initials: 'BS', email: 'budi@patigoapp.id', tagihan: 'Sewa Kos Juli', jumlah: 1500000, bank: 'BCA (Transfer)', waktu: '15 menit lalu' },
    { id: 2, name: 'Sari Dewi', initials: 'SD', email: 'sari@patigoapp.id', tagihan: 'Tagihan Listrik', jumlah: 130000, bank: 'Mandiri (Transfer)', waktu: '1 jam lalu' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Verifikasi Pembayaran</h2>
        <p className="text-slate-500 mt-1">Konfirmasi laporan pembayaran iuran dari para anggota kos</p>
      </div>

      {pendingApprovals.length === 0 ? (
        <Card className="p-8 text-center flex flex-col items-center justify-center max-w-xl mx-auto">
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-3">
            <Check className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-lg">Semua Aman!</h4>
          <p className="text-slate-500 text-sm mt-1">Tidak ada ajuan pembayaran tertunda yang perlu diverifikasi saat ini.</p>
        </Card>
      ) : (
        <Card>
          <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2 text-sm text-amber-700 bg-amber-50/40 rounded-t-2xl">
            <ShieldAlert className="w-4 h-4" />
            <span>Ada <strong>{pendingApprovals.length} transaksi</strong> menunggu persetujuan Anda.</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anggota Kos</TableHead>
                <TableHead>Untuk Tagihan</TableHead>
                <TableHead>Metode & Waktu</TableHead>
                <TableHead>Nominal Transfer</TableHead>
                <TableHead>Bukti</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                        {item.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-700">{item.tagihan}</TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-800">{item.bank}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.waktu}</p>
                  </TableCell>
                  <TableCell className="font-bold text-blue-600">{formatRupiah(item.jumlah)}</TableCell>
                  <TableCell>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200/50 transition-colors">
                      <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                      Lihat Gambar
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50" title="Tolak">
                        <X className="w-4 h-4" />
                      </Button>
                      <Button size="icon" className="h-8 w-8 rounded-full bg-green-600 hover:bg-green-700 shadow-none" title="Setujui">
                        <Check className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}