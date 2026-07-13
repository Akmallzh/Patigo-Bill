import React from 'react';
import { Bell, Search, Plus, Menu } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Cari tagihan, anggota..." 
            className="w-full h-11 pl-10 pr-4 bg-slate-50 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-100 focus:bg-white transition-colors outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button className="hidden md:flex gap-2 rounded-full h-10 px-5 text-sm">
          <Plus className="w-4 h-4" />
          Tambah Tagihan
        </Button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-500 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
}
