'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Book } from '@/types';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (data) setBooks(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm('ยืนยันที่จะลบหนังสือเล่มนี้?')) {
      await supabase.from('books').delete().eq('id', id);
      fetchBooks();
    }
  };

  const filteredBooks = books.filter(book => {
    const term = searchTerm.toLowerCase();
    const titleMatch = book.title?.toLowerCase().includes(term) || false;
    const authorMatch = book.author?.toLowerCase().includes(term) || false;
    return titleMatch || authorMatch;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            จัดการหนังสือ ({filteredBooks.length})
          </h1>
          <p className="text-gray-500 text-sm mt-1">รายการหนังสือทั้งหมดในระบบ</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative group w-full sm:w-64">
                <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all shadow-sm">
                    <Search size={18} className="text-gray-400 min-w-[18px]" />
                    <input 
                        type="text"
                        placeholder="ค้นหาชื่อ หรือ ผู้แต่ง..."
                        className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600 p-1">
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            <Link href="/admin/new" className="bg-gray-600 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 font-bold hover:bg-indigo-700 shadow-md transition-colors whitespace-nowrap">
              <Plus size={20} /> <span className="hidden sm:inline">เพิ่มหนังสือ</span><span className="sm:hidden">เพิ่ม</span>
            </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
         
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 w-24">ปก</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500">รายละเอียดหนังสือ</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-right w-32">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBooks.length > 0 ? (
                  filteredBooks.map(book => (
                    <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3">
                          <div className="relative h-16 w-12 bg-gray-200 rounded overflow-hidden shadow-sm">
                              {book.cover_url ? (
                                <Image src={book.cover_url} alt="" fill className="object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                              )}
                          </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-bold text-gray-900 text-base mb-0.5">{book.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                           {book.author || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/${book.id}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="แก้ไข">
                            <Edit size={18} />
                          </Link>
                          <button onClick={() => handleDelete(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="ลบ">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-2">
                              <Search size={32} className="text-gray-300" />
                              <p>ไม่พบหนังสือที่ตรงกับ "{searchTerm}"</p>
                          </div>
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}