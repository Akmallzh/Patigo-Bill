import React from 'react';
import { Send, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useAppContext } from '../../context/AppContext';
import { formatShortRupiah } from '../../utils/format';

export function Pelacakan() {
  const { members, tagihan } = useAppContext();

  // Aggregate data per member
  const memberStats = members.filter(m => m.role === 'anggota').map(member => {
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
      progress,
      status
    };
  });

  const totalBelumTerkumpul = memberStats.reduce((sum, m) => sum + m.belumBayar, 0);
  const totalSudahTerkumpul = memberStats.reduce((sum, m) => sum + m.sudahBayar, 0);
  const totalSemua = totalBelumTerkumpul + totalSudahTerkumpul;
  const tingkatKoleksi = totalSemua === 0 ? 0 : (totalSudahTerkumpul / totalSemua) * 100;
  
  const belumLunasCount = memberStats.filter(m => m.status !== 'Lunas').length;
  const lunasCount = memberStats.filter(m => m.status === 'Lunas').length;

  const handleKirimPengingat = (member) => {
    const message = `Halo ${member.name}, ini pengingat dari Admin bahwa kamu memiliki tagihan kos sebesar ${formatShortRupiah(member.belumBayar)} yang belum dibayar. Mohon segera diselesaikan ya. Terima kasih!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://web.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Pelacakan Utang</h2>
          <p className="text-slate-500 mt-1">Status pembayaran seluruh anggota</p>
        </div>
        <Button variant="secondary" className="gap-2 rounded-full">
          <Send className="w-4 h-4" />
          Kirim Pengingat
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Belum Terkumpul</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-bold text-red-500">{formatShortRupiah(totalBelumTerkumpul)}</h3>
                <p className="text-sm text-slate-500 mt-1">{belumLunasCount} anggota</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Sudah Terkumpul</p>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-bold text-green-500">{formatShortRupiah(totalSudahTerkumpul)}</h3>
                <p className="text-sm text-slate-500 mt-1">{lunasCount} anggota lunas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tingkat Koleksi</p>
            <div className="mt-2">
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-3xl font-bold text-blue-600">{Math.round(tingkatKoleksi)}%</h3>
              </div>
              <ProgressBar value={tingkatKoleksi} colorClass="bg-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Detail Anggota</h3>
          <Button variant="secondary" size="sm" className="gap-2 h-9 rounded-lg">
            <Download className="w-4 h-4" />
            Ekspor
          </Button>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anggota</TableHead>
                <TableHead className="text-center">Tagihan</TableHead>
                <TableHead>Sudah Bayar</TableHead>
                <TableHead>Belum Bayar</TableHead>
                <TableHead className="w-[200px]">Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memberStats.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-500">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium text-slate-600">
                    {member.totalTagihanCount}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-green-600">
                      {member.sudahBayar > 0 ? formatShortRupiah(member.sudahBayar) : '—'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-red-500">
                      {member.belumBayar > 0 ? formatShortRupiah(member.belumBayar) : '—'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <ProgressBar 
                      value={member.progress} 
                      showValue 
                      colorClass={
                        member.progress === 100 ? 'bg-green-500' :
                        member.progress > 0 ? 'bg-amber-500' : 'bg-red-500'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        member.status === 'Lunas' ? 'success' :
                        member.status === 'Sebagian' ? 'warning' : 'danger'
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {member.status !== 'Lunas' && (
                      <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-blue-600" onClick={() => handleKirimPengingat(member)}>
                        <Send className="w-4 h-4" />
                        Ingatkan
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
