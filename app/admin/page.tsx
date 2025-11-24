'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Book } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([]);

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
      fetchBooks(); // Refresh list
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">จัดการหนังสือ ({books.length})</h1>
        <Link href="/admin/new" className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-indigo-700 shadow-md">
          <Plus size={20} /> เพิ่มหนังสือ
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-500">ปก</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-500">ชื่อหนังสือ</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-500 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {books.map(book => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 w-20">
                    <div className="relative h-16 w-12 bg-gray-200 rounded overflow-hidden">
                        {book.cover_url ? (
                           <Image src={book.cover_url} alt="" fill className="object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                        )}
                    </div>
                </td>
                <td className="px-6 py-3">
                  <div className="font-bold">{book.title}</div>
                  <div className="text-sm text-gray-500">{book.author || '-'}</div>
                </td>
                <td className="px-6 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/${book.id}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(book.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}