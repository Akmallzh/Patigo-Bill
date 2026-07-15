import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, User, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Mengelompokkan input ke dalam satu state object
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false
  });

  // Handler dinamis untuk semua input (teks & checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Ganti dengan panggilan API sesungguhnya (contoh: axios.post('/api/register', formData))
    console.log('Mencoba mendaftar dengan data:', formData);

    // Simulasi loading sebentar
    setTimeout(() => {
      setIsLoading(false);
      // Umumnya setelah daftar langsung dibawa ke dashboard atau halaman login
      navigate('/admin/dashboard'); 
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-slate-900 leading-tight">Patigo Bill</h1>
          <p className="text-xs text-slate-500">Registrasi Kelompok Baru</p>
        </div>
      </div>

      <Card className="w-full max-w-md p-2">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">Buat Akun Baru</h2>
            <p className="text-sm text-slate-500 mt-1">Mulai kelola transparansi patungan finansial kelompok kosanmu</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap Anda" 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com" 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Kata Sandi Baru</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter" 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors" 
                  minLength={8}
                  required 
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1 text-xs text-slate-500 leading-normal">
              <input 
                type="checkbox" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 rounded border-slate-300 accent-blue-600 focus:ring-blue-500" 
                required 
              />
              <span>Saya menyetujui Ketentuan Layanan dan Kebijakan Privasi aplikasi Patigo Bill.</span>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl font-semibold text-sm mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
            </Button>
          </form>

          <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">
            Sudah terdaftar sebelumnya?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Log In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}