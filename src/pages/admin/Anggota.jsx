import React, { useState } from 'react';
import { UserPlus, Search, LayoutGrid, List, Eye, Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAppContext } from '../../context/AppContext';
import { formatShortRupiah } from '../../utils/format';
import { cn } from '../../utils/cn';

export function Anggota() {
  const { members, tagihan } = useAppContext();
  const [filter, setFilter] = useState('Semua');

  const memberStats = members.map(member => {
    const memberTagihan = tagihan.filter(t => t.memberId === member.id);
    const totalTagihanCount = memberTagihan.length;
    const sudahBayar = memberTagihan.filter(t => t.status === 'Lunas').reduce((sum, t) => sum + t.amount, 0);
    const belumBayar = memberTagihan.filter(t => t.status !== 'Lunas').reduce((sum, t) => sum + t.amount, 0);
    const totalAmount = sudahBayar + belumBayar;
    const progress = totalAmount === 0 ? 0 : (sudahBayar / totalAmount) * 100;
    
    let status = 'Belum Lunas';
    if (progress === 100) status = 'Lunas';
    else if (progress > 0) status = 'Sebagian';

    return {
      ...member,
      totalTagihanCount,
      sudahBayar,
      belumBayar,
      totalAmount,
      progress,
      status
    };
  });

  const filteredMembers = memberStats.filter(m => filter === 'Semua' || m.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Anggota</h2>
          <p className="text-slate-500 mt-1">{members.length} anggota dalam kelompok</p>
        </div>
        <Button className="gap-2 rounded-full">
          <UserPlus className="w-4 h-4" />
          Tambah Anggota
        </Button>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari anggota..." 
            className="w-full h-10 pl-9 pr-4 bg-white border border-slate-200 rounded-full text-sm focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-full text-sm font-medium text-slate-600">
            {['Semua', 'Lunas', 'Sebagian', 'Belum Lunas'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn("px-4 py-1.5 rounded-full transition-colors", filter === f ? "bg-white shadow-sm text-slate-900" : "hover:text-slate-900")}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-100 p-1 rounded-full text-slate-500">
            <button className="p-1.5 rounded-full bg-white shadow-sm text-slate-800">
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full hover:text-slate-800">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden flex flex-col">
            <div className="p-6 pb-4">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg",
                    member.role === 'admin' ? "bg-blue-600" : (member.id % 2 === 0 ? "bg-purple-600" : (member.id % 3 === 0 ? "bg-emerald-600" : "bg-orange-500"))
                  )}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{member.name}</h3>
                    <p className="text-sm text-slate-500 mb-2">{member.email}</p>
                    {member.status === 'Lunas' ? (
                      <Badge variant="success" className="gap-1 bg-green-50 text-green-700">Lunas <Check className="w-3 h-3" /></Badge>
                    ) : member.status === 'Sebagian' ? (
                      <Badge variant="warning">Sebagian</Badge>
                    ) : (
                      <Badge variant="danger">Belum Lunas</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Belum Lunas</p>
                  <p className={cn("text-lg font-bold", member.status === 'Lunas' ? "text-green-600 flex items-center gap-1" : "text-red-500")}>
                    {member.status === 'Lunas' ? (
                      <>Lunas <Check className="w-4 h-4"/></>
                    ) : (
                      formatShortRupiah(member.belumBayar)
                    )}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Bayar</p>
                  <p className="text-lg font-bold text-slate-800">{formatShortRupiah(member.sudahBayar)}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-auto px-6 py-4 border-t border-slate-50 flex items-center justify-between text-sm text-slate-500 bg-white">
              <span>{member.totalTagihanCount} tagihan · Bergabung {member.joinDate}</span>
              <button className="flex items-center gap-1.5 font-medium text-slate-700 hover:text-blue-600 transition-colors">
                <Eye className="w-4 h-4" />
                Detail
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
