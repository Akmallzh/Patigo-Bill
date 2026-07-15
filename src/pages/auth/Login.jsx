import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Mail, Lock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';

export function Login() {
  const navigate = useNavigate();
  
  // State untuk menampung input pengguna
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Ganti dengan panggilan API sesungguhnya (contoh: axios.post('/api/login'))
    console.log('Mencoba login dengan:', { email, password });

    // Simulasi loading sebentar sebelum masuk dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 font-sans">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-slate-900 leading-tight">Patigo Bill</h1>
          <p className="text-xs text-slate-500">Kelompok Kos Harmoni</p>
        </div>
      </div>

      <Card className="w-full max-w-md p-2">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800">Selamat Datang Kembali</h2>
            <p className="text-sm text-slate-500 mt-1">Masuk untuk mengelola tagihan kas dan kos kelompokmu</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com" 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-700">Kata Sandi</label>
                <a href="#" className="text-xs font-medium text-blue-600 hover:underline">Lupa password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white outline-none transition-colors" 
                  required 
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-11 rounded-xl font-semibold text-sm mt-2"
              disabled={isLoading}
            >
              {isLoading ? 'Memproses...' : 'Masuk Akun'}
            </Button>
          </form>

          <div className="text-center text-sm text-slate-500 pt-2 border-t border-slate-100">
            Belum punya akun kelompok kos?{' '}
            <Link to="/signup" className="font-semibold text-blue-600 hover:underline">
              Daftar Sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}