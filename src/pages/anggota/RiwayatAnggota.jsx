import React, { useMemo } from 'react';
import { History, Download, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { useAppContext } from '../../context/AppContext';
import { formatRupiah } from '../../utils/format';

export function RiwayatAnggota() {
  const { currentUser, tagihan, pengeluaran } = useAppContext();

  // Ambil hanya tagihan yang sudah "Lunas"
  const historyData = useMemo(() => {
    return tagihan
      .filter((t) => t.memberId === currentUser.id && t.status === 'Lunas')
      .map((t) => {
        const expense = pengeluaran.find((p) => p.id === t.pengeluaranId);
        return { ...t, expense };
      });
  }, [tagihan, pengeluaran, currentUser.id]);

  const totalTelahDibayar = historyData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Riwayat Pembayaran</h2>
          <p className="text-slate-500 mt-1">Rekam jejak semua tagihan yang telah Anda lunasi</p>
        </div>
        <Button variant="secondary" className="gap-2 rounded-full bg-white shadow-sm">
          <Download className="w-4 h-4 text-slate-500" />
          Unduh Laporan
        </Button>
      </div>

      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="text-green-50 text-sm font-medium mb-1">Total Kontribusi Anda</p>
            <h3 className="text-3xl font-bold">{formatRupiah(totalTelahDibayar)}</h3>
            <p className="text-xs text-green-100 mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {historyData.length} tagihan berhasil dilunasi
            </p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <History className="w-8 h-8 text-white" />
          </div>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <h3 className="font-semibold text-slate-800">Daftar Transaksi Selesai</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tagihan</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal Pengeluaran</TableHead>
              <TableHead>Nominal Dibayar</TableHead>
              <TableHead className="text-right">Kuitansi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-semibold text-slate-800">{item.expense?.judul}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="success" className="bg-green-50 text-green-700 font-normal">
                    {item.expense?.kategori}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {item.expense?.tanggal}
                </TableCell>
                <TableCell className="font-bold text-slate-800">
                  {formatRupiah(item.amount)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <FileText className="w-4 h-4" />
                    Lihat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {historyData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                  Belum ada riwayat pembayaran yang tercatat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}