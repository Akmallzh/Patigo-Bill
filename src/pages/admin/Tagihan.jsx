import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAppContext } from '../../context/AppContext';
import { formatRupiah, formatShortRupiah } from '../../utils/format';
import { cn } from '../../utils/cn';

export function Tagihan() {
  const { pengeluaran, tagihan } = useAppContext();
  const [filter, setFilter] = useState('Semua');

  const tagihanStats = pengeluaran.map(p => {
    const pTagihan = tagihan.filter(t => t.pengeluaranId === p.id);
    const memberCount = pTagihan.length;
    
    const sudahBayar = pTagihan.filter(t => t.status === 'Lunas').reduce((sum, t) => sum + t.amount, 0);
    const progress = p.total === 0 ? 0 : (sudahBayar / p.total) * 100;
    
    let status = 'Belum Lunas';
    if (progress === 100) status = 'Lunas';
    else if (progress > 0) status = 'Sebagian';

    return {
      ...p,
      memberCount,
      sudahBayar,
      progress,
      status
    };
  });

  const filteredTagihan = tagihanStats.filter(t => filter === 'Semua' || t.status === filter || (filter === 'Belum' && t.status === 'Belum Lunas'));

  const count = {
    semua: tagihanStats.length,
    lunas: tagihanStats.filter(t => t.status === 'Lunas').length,
    sebagian: tagihanStats.filter(t => t.status === 'Sebagian').length,
    belum: tagihanStats.filter(t => t.status === 'Belum Lunas').length,
  };

  const tabs = [
    { id: 'Semua', label: 'Semua', count: count.semua },
    { id: 'Lunas', label: 'Lunas', count: count.lunas },
    { id: 'Sebagian', label: 'Sebagian', count: count.sebagian },
    { id: 'Belum', label: 'Belum', count: count.belum },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Tagihan</h2>
          <p className="text-slate-500 mt-1">{tagihanStats.length} tagihan bulan ini</p>
        </div>
        <Button className="gap-2 rounded-full shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Tagihan
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari tagihan..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        
        <div className="flex bg-white p-1 rounded-full border border-slate-200 text-sm font-medium text-slate-600">
          {tabs.map(t => (
            <button 
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={cn(
                "px-4 py-1.5 rounded-full transition-colors flex items-center gap-2", 
                filter === t.id ? "bg-slate-100 text-slate-900" : "hover:text-slate-900"
              )}
            >
              {t.label}
              <span className={cn(
                "px-1.5 py-0.5 rounded-full text-[10px] leading-none",
                filter === t.id ? "bg-slate-200 text-slate-700" : "bg-slate-100 text-slate-500"
              )}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tagihan</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Nominal IDR</TableHead>
              <TableHead>Split</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="w-[200px]">Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTagihan.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <p className="font-semibold text-slate-800">{t.judul}</p>
                  <p className="text-xs text-slate-500">{t.memberCount} anggota</p>
                  {t.description && <p className="text-xs text-blue-600 mt-0.5">· {t.description}</p>}
                </TableCell>
                <TableCell>
                  <Badge variant="default" className="font-normal text-slate-600 bg-slate-100">{t.kategori}</Badge>
                </TableCell>
                <TableCell>
                  <p className="font-semibold text-slate-800">{formatRupiah(t.total)}</p>
                  <p className="text-xs text-slate-500">{formatShortRupiah(t.sudahBayar)} lunas</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{t.split}</span>
                </TableCell>
                <TableCell className="text-slate-500 whitespace-nowrap">
                  {t.tanggal}
                </TableCell>
                <TableCell>
                  <ProgressBar 
                    value={t.progress} 
                    colorClass={
                      t.progress === 100 ? 'bg-green-500' :
                      t.progress > 0 ? 'bg-amber-500' : 'bg-red-500'
                    }
                  />
                  <p className="text-xs text-slate-500 mt-1">{Math.round(t.progress)}% terkumpul</p>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      t.status === 'Lunas' ? 'success' :
                      t.status === 'Sebagian' ? 'warning' : 'danger'
                    }
                  >
                    {t.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
