'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Book } from '@/types';
import { Upload, Camera, Save } from 'lucide-react';
import Image from 'next/image';

interface BookFormProps {
  initialData?: Book;
  mode: 'create' | 'edit';
}

export default function BookForm({ initialData, mode }: BookFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.cover_url || '');
  const [file, setFile] = useState<File | null>(null);

  // Default values
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    author: initialData?.author || '',
    rating: initialData?.rating || 5,
    review: initialData?.review || '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!file) return initialData?.cover_url || null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('book-covers')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('book-covers')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Get Current User (สำหรับ field user_id)
      const { data: { user } } = await supabase.auth.getUser();
      if (!user && mode === 'create') {
        alert('กรุณาเข้าสู่ระบบก่อนบันทึก');
        return;
      }

      const coverUrl = await uploadImage();

      const bookData = {
        title: formData.title,
        author: formData.author,
        rating: Number(formData.rating),
        review: formData.review,
        cover_url: coverUrl,
        // ถ้าเป็น create ให้ใส่ user_id ด้วย
        ...(mode === 'create' ? { user_id: user?.id } : {}),
        updated_at: new Date().toISOString(), // อัปเดตเวลาแก้ไข
      };

      if (mode === 'create') {
        const { error } = await supabase.from('books').insert([bookData]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('books')
          .update(bookData)
          .eq('id', initialData?.id); // id ตอนนี้เป็น UUID (string) แล้ว
        if (error) throw error;
      }

      router.push('/admin');
      router.refresh();
    } catch (error: any) {
      console.error('Error saving book:', error);
      alert('เกิดข้อผิดพลาด: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-6">
      
      {/* Image Upload UI */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">รูปปกหนังสือ</label>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div 
            className="relative w-32 h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0 group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            ) : (
              <Camera className="text-gray-400" size={32} />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          
          <div className="flex-1">
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" 
              accept="image/*"
            />
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm mb-2"
            >
              <Upload size={16} />
              อัปโหลดรูปภาพ
            </button>
            <p className="text-xs text-gray-500">รองรับไฟล์ภาพ JPG, PNG</p>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ชื่อหนังสือ</label>
          <input 
            required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ผู้แต่ง</label>
          <input 
            required
            value={formData.author}
            onChange={e => setFormData({...formData, author: e.target.value})}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">คะแนน (1-5)</label>
        <div className="flex gap-4 items-center">
            <input 
                type="range" min="1" max="5" step="1"
                value={formData.rating}
                onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="font-bold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-lg">{formData.rating} ดาว</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">รีวิว</label>
        <textarea 
          required
          rows={6}
          value={formData.review}
          onChange={e => setFormData({...formData, review: e.target.value})}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        ></textarea>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button type="button" onClick={() => router.back()} className="px-6 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100">ยกเลิก</button>
        <button 
          type="submit" 
          disabled={loading}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'กำลังบันทึก...' : <><Save size={18} /> บันทึกข้อมูล</>}
        </button>
      </div>
    </form>
  );
}