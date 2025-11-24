'use client';
import Link from 'next/link';
import { Book, Search, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onSearch?: (term: string) => void;
  showSearch?: boolean;
}

export default function Navbar({ onSearch, showSearch = false }: NavbarProps) {
  const [term, setTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gray-600 p-1.5 rounded-lg">
              <Book className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">
              Moojee<span className="text-gray-600"> Books</span>
            </span>
          </Link>

          {/* Search Bar (Show only if requested) */}
          {showSearch && (
            <div className="relative group w-40 sm:w-64">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-gray-700 focus-within:bg-white transition-all">
                <Search size={18} className="text-gray-400 min-w-[18px]" />
                <input
                  type="text"
                  placeholder="ค้นหาหนังสือ..."
                  className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
                  value={term}
                  onChange={handleSearch}
                />
                {term && (
                  <button onClick={() => { setTerm(''); if(onSearch) onSearch(''); }} className="text-gray-400 hover:text-gray-600">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}