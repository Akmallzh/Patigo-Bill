import React, { useState } from 'react';
import { Plus, Search, Receipt, Calendar, Info, FileText } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { useAppContext } from '../../context/AppContext';
import { formatRupiah } from '../../utils/format';

export function Pengeluaran() {
  const { pengeluaran } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Log Pengeluaran</h2>
          <p className="text-slate-500 mt-1">Daftar nota belanja dan pengeluaran induk kelompok kos</p>
        </div>
        <Button className="gap-2 rounded-full shadow-sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Catat Pengeluaran Baru
        </Button>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Cari nota belanja..." 
          className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Pengeluaran</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Metode Bagi</TableHead>
              <TableHead className="text-right">Total Biaya</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pengeluaran.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{p.judul}</p>
                      {p.description && <p className="text-xs text-slate-500 mt-0.5">{p.description}</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="bg-slate-100 text-slate-600 font-normal">{p.kategori}</Badge>
                </TableCell>
                <TableCell className="text-slate-500 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {p.tanggal}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{p.split}</span>
                </TableCell>
                <TableCell className="text-right font-bold text-slate-800">
                  {formatRupiah(p.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal Pengeluaran Baru */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Catat Pengeluaran Kelompok">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Judul Pengeluaran / Nota</label>
            <input type="text" placeholder="Contoh: Beli Token Listrik Utama" className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Total Biaya (IDR)</label>
              <input type="number" placeholder="Rp" className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Kategori</label>
              <select className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none text-slate-700">
                <option>Utilitas</option>
                <option>Sewa</option>
                <option>Makanan</option>
                <option>Hiburan</option>
                <option>Lain-lain</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Keterangan Tambahan (Opsional)</label>
            <textarea placeholder="Tulis catatan kecil jika diperlukan..." className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none h-20 resize-none"></textarea>
          </div>
          <div className="bg-blue-50/50 rounded-xl p-3 flex gap-2.5 items-start text-xs text-blue-700 border border-blue-100/50">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <p>Sistem otomatis membagi rata nominal tagihan ini kepada seluruh anggota aktif kelompok kos Harmoni setelah Anda menyimpannya.</p>
          </div>
          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="ghost" className="rounded-full" onClick={() => setIsModalOpen(false)}>Batal</Button>
            <Button type="submit" className="rounded-full px-6">Simpan & Distribusikan</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}