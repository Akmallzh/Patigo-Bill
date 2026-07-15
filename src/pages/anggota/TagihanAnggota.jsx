import React, { useState, useMemo } from 'react';
import { Wallet, AlertCircle, Upload, Info, Search, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useAppContext } from '../../context/AppContext';
import { formatRupiah } from '../../utils/format';
import { cn } from '../../utils/cn';

export function TagihanAnggota() {
  const { currentUser, tagihan, pengeluaran } = useAppContext();
  const [filter, setFilter] = useState('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTagihan, setSelectedTagihan] = useState(null);

  // Menggabungkan data tagihan user dengan detail pengeluaran
  const myBills = useMemo(() => {
    return tagihan
      .filter((t) => t.memberId === currentUser.id)
      .map((t) => {
        const expense = pengeluaran.find((p) => p.id === t.pengeluaranId);
        return { ...t, expense };
      });
  }, [tagihan, pengeluaran, currentUser.id]);

  const totalBelumBayar = myBills
    .filter((t) => t.status !== 'Lunas')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredBills = myBills.filter(
    (t) => filter === 'Semua' || t.status === filter
  );

  const handleBayarClick = (bill) => {
    setSelectedTagihan(bill);
    setIsModalOpen(true);
  };

  const handleSimpanPembayaran = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    alert('Bukti pembayaran berhasil diunggah! (Simulasi)');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tagihan Saya</h2>
          <p className="text-slate-500 mt-1">Daftar iuran dan tagihan yang perlu Anda selesaikan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{formatRupiah(totalBelumBayar)}</h3>
            <p className="text-sm font-medium text-slate-500">Total Belum Dibayar</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{myBills.length}</h3>
            <p className="text-sm font-medium text-slate-500">Total Semua Tagihan</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex bg-white p-1 rounded-full border border-slate-200 text-sm font-medium text-slate-600">
          {['Semua', 'Belum Lunas', 'Lunas'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors flex items-center gap-2",
                filter === f ? "bg-slate-100 text-slate-900" : "hover:text-slate-900"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Tagihan</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Nominal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>
                  <p className="font-semibold text-slate-800">{bill.expense?.judul}</p>
                  {bill.expense?.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{bill.expense.description}</p>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="font-normal text-slate-600 bg-slate-100">
                    {bill.expense?.kategori}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-sm">
                  {bill.expense?.tanggal}
                </TableCell>
                <TableCell className="font-bold text-slate-800">
                  {formatRupiah(bill.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant={bill.status === 'Lunas' ? 'success' : 'danger'}>
                    {bill.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {bill.status !== 'Lunas' ? (
                    <Button size="sm" className="rounded-lg" onClick={() => handleBayarClick(bill)}>
                      Bayar
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" className="rounded-lg text-green-600 hover:text-green-700 pointer-events-none gap-1">
                      <Check className="w-4 h-4" /> Selesai
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredBills.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                  Tidak ada tagihan yang sesuai.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Modal Upload Bukti Pembayaran */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Konfirmasi Pembayaran">
        {selectedTagihan && (
          <form className="space-y-4" onSubmit={handleSimpanPembayaran}>
            <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-100">
              <p className="text-xs text-slate-500 mb-1">Tagihan untuk:</p>
              <p className="font-semibold text-slate-800">{selectedTagihan.expense?.judul}</p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-200">
                <span className="text-sm text-slate-600">Total Tagihan</span>
                <span className="font-bold text-blue-600">{formatRupiah(selectedTagihan.amount)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Unggah Bukti Transfer</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-700">Pilih foto atau tarik kemari</p>
                <p className="text-xs text-slate-500 mt-1">JPG, PNG maks 2MB</p>
                {/* Input file sembunyi, ini cuma UI dummy */}
                <input type="file" className="hidden" />
              </div>
            </div>

            <div className="bg-blue-50/50 rounded-xl p-3 flex gap-2.5 items-start text-xs text-blue-700 border border-blue-100/50 mt-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p>Setelah diunggah, admin kelompok akan memverifikasi bukti pembayaran Anda sebelum status tagihan berubah menjadi Lunas.</p>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button type="button" variant="ghost" className="rounded-full" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="rounded-full px-6">
                Kirim Bukti
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}