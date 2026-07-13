import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useAppContext } from '../../context/AppContext';

export function Pengaturan() {
  const { currentUser } = useAppContext();
  
  // Split name for dummy purpose
  const nameParts = currentUser.name.split(' ');
  const [formData, setFormData] = useState({
    namaDepan: nameParts[0] || '',
    namaBelakang: nameParts.slice(1).join(' ') || '',
    email: currentUser.email || '',
    hp: '0812-3456-7890' // dummy
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save
    alert('Profil berhasil disimpan! (Simulasi)');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Pengaturan</h2>
        <p className="text-slate-500 mt-1">Kelola profil dan preferensi akun</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profil</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                {currentUser.initials}
              </div>
              <div>
                <Button type="button" variant="secondary" className="gap-2 bg-white mb-2">
                  <Upload className="w-4 h-4" />
                  Ganti Foto
                </Button>
                <p className="text-xs text-slate-500">JPG, PNG, atau GIF · maks 2 MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nama Depan</label>
                <input 
                  type="text" 
                  name="namaDepan"
                  value={formData.namaDepan}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nama Belakang</label>
                <input 
                  type="text" 
                  name="namaBelakang"
                  value={formData.namaBelakang}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Alamat Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">No. HP</label>
              <input 
                type="text" 
                name="hp"
                value={formData.hp}
                onChange={handleChange}
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="rounded-full px-8">
                Simpan Profil
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nama Kelompok</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2 max-w-md">
              <label className="text-sm font-medium text-slate-700">Nama Kos/Kelompok</label>
              <input 
                type="text" 
                defaultValue="Kelompok Kos Harmoni"
                className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors"
              />
            </div>
            <Button variant="secondary" className="bg-white">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
