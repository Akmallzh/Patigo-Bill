import React from 'react';
import { Plus, Users, Receipt, AlertCircle, CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { useAppContext } from '../../context/AppContext';

export function DashboardAdmin() {
  const { monthlyData } = useAppContext();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500 mt-1">Juli 2026 · 6 anggota · 8 tagihan</p>
        </div>
        <Button className="gap-2 rounded-full shadow-sm">
          <Plus className="w-4 h-4" />
          Tambah Tagihan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                <TrendingDown className="w-4 h-4" /> 8%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">Rp 2.1jt</h3>
            <p className="text-sm font-medium text-slate-500">Total Belum Lunas</p>
            <p className="text-sm text-slate-400 mt-1">2 tagihan pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">6</h3>
            <p className="text-sm font-medium text-slate-500">Total Anggota</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-green-500 text-sm font-medium">
                <TrendingUp className="w-4 h-4" /> 12%
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">Rp 8.5jt</h3>
            <p className="text-sm font-medium text-slate-500">Total Tagihan</p>
            <p className="text-sm text-slate-400 mt-1">8 tagihan</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">4</h3>
            <p className="text-sm font-medium text-slate-500">Tagihan Lunas</p>
            <p className="text-sm text-slate-400 mt-1">2 belum lunas</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="p-6 pb-2 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">Pengeluaran Bulanan</h3>
            <p className="text-sm text-slate-500">Feb – Jul 2026</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div> Total
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Lunas
            </div>
          </div>
        </div>
        <div className="p-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLunas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(val) => val === 0 ? '0' : `${(val / 1000000).toFixed(1)}jt`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)}
              />
              <Area type="monotone" dataKey="Lunas" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorLunas)" />
              <Area type="monotone" dataKey="Total" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
