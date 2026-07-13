import React, { useState } from 'react';
import { Download, FileText, Plus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../utils/cn';

export function Laporan() {
  const { monthlyData } = useAppContext();
  const [timeRange, setTimeRange] = useState('6 Bulan');

  const categories = [
    { name: 'Sewa', percentage: 71, color: 'bg-blue-600' },
    { name: 'Makanan', percentage: 15, color: 'bg-green-500' },
    { name: 'Utilitas', percentage: 14, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Laporan</h2>
          <p className="text-slate-500 mt-1">Ringkasan keuangan kelompok</p>
        </div>
        <Button className="gap-2 rounded-full shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Tagihan
        </Button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex bg-slate-100 p-1 rounded-full text-sm font-medium text-slate-600">
          {['3 Bulan', '6 Bulan', '1 Tahun'].map(t => (
            <button 
              key={t}
              onClick={() => setTimeRange(t)}
              className={cn("px-4 py-1.5 rounded-full transition-colors", timeRange === t ? "bg-white shadow-sm text-slate-900" : "hover:text-slate-900")}
            >
              {t}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2 rounded-full bg-white">
            <FileText className="w-4 h-4 text-slate-500" />
            Ekspor PDF
          </Button>
          <Button variant="secondary" className="gap-2 rounded-full bg-white">
            <Download className="w-4 h-4 text-slate-500" />
            Ekspor Excel
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pengeluaran Bulanan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 0, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  tickFormatter={(val) => val === 0 ? '0.0jt' : `${(val / 1000000).toFixed(1)}jt`}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
                />
                <Legend iconType="square" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="Lunas" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Belum" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kategori Pengeluaran</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {categories.map(cat => (
            <div key={cat.name}>
              <div className="flex justify-between items-center mb-2 text-sm">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <div className={cn("w-2 h-2 rounded-full", cat.color)}></div>
                  {cat.name}
                </div>
                <span className="font-semibold text-slate-800">{cat.percentage}%</span>
              </div>
              <ProgressBar value={cat.percentage} colorClass={cat.color} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
