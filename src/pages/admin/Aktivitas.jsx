import React from 'react';
import { RefreshCcw, CheckCircle2, Receipt, Bell } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAppContext } from '../../context/AppContext';
import { formatRupiah } from '../../utils/format';

export function Aktivitas() {
  const { aktivitas } = useAppContext();

  const getIcon = (type) => {
    switch (type) {
      case 'Pembayaran': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'Tagihan': return <Receipt className="w-5 h-5 text-blue-500" />;
      case 'Pengingat': return <Bell className="w-5 h-5 text-amber-500" />;
      default: return null;
    }
  };

  const getBgIcon = (type) => {
    switch (type) {
      case 'Pembayaran': return 'bg-green-50';
      case 'Tagihan': return 'bg-blue-50';
      case 'Pengingat': return 'bg-amber-50';
      default: return 'bg-slate-50';
    }
  };

  const getBadgeVariant = (type) => {
    switch (type) {
      case 'Pembayaran': return 'success';
      case 'Tagihan': return 'info';
      case 'Pengingat': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Aktivitas</h2>
          <p className="text-slate-500 mt-1">Semua aktivitas terbaru kelompok</p>
        </div>
        <Button variant="secondary" className="gap-2 rounded-full bg-white shadow-sm">
          <RefreshCcw className="w-4 h-4 text-slate-500" />
          Refresh
        </Button>
      </div>

      <Card>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <h3 className="font-semibold text-slate-800">Riwayat Aktivitas</h3>
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
            {aktivitas.length} aktivitas
          </span>
        </div>
        <div className="p-0">
          <ul className="divide-y divide-slate-100">
            {aktivitas.map((item, index) => (
              <li key={item.id} className="p-6 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBgIcon(item.type)}`}>
                    {getIcon(item.type)}
                  </div>
                  {/* Timeline connector */}
                  {index !== aktivitas.length - 1 && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-full bg-slate-100" style={{ height: 'calc(100% + 1.5rem)' }} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {item.title} 
                      {item.amount && (
                        <span className="text-slate-400"> · {formatRupiah(item.amount)}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-slate-500">{item.time}</span>
                    <Badge variant={getBadgeVariant(item.type)} className="bg-transparent border border-current opacity-70">
                      {item.type}
                    </Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
