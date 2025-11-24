'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import BookForm from '@/components/BookForm';
import { Book } from '@/types';
import { useParams, useRouter } from 'next/navigation'; // 1. ใช้ useParams

export default function EditBookPage() {
  // 2. ดึง id จาก URL ด้วย hook useParams() (ไม่ต้องรอ await)
  const params = useParams();
  const id = params?.id as string; 
  
  const [book, setBook] = useState<Book | null>(null);
  const router = useRouter();

  useEffect(() => {
    // ถ้าไม่มี id ไม่ต้องทำต่อ
    if (!id) return;

    const fetchBook = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching book:', error);
        alert('ไม่พบข้อมูลหนังสือ');
        router.push('/admin'); // ถ้าหาไม่เจอให้ดีดกลับหน้า Admin
      } else {
        setBook(data);
      }
    };

    fetchBook();
  }, [id, router]); // 3.[id] แทน [params.id]

  if (!book) return <div className="p-8 text-center text-gray-500">Loading book data...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">แก้ไข: {book.title}</h1>
      <BookForm mode="edit" initialData={book} />
    </div>
  );
}