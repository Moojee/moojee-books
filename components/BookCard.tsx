import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Book } from '@/types';

export default function BookCard({ book }: { book: Book }) {
  // กันกระแทก: ถ้าไม่มีคะแนน ให้ถือว่าเป็น 0
  const rating = book.rating || 0;

  return (
    <Link href={`/book/${book.id}`} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 block">
      {/* aspect-2/3 - กำหนดอัตราส่วน (aspect ratio) ของกล่องเป็น 2:3 */}
      <div className="aspect-2/3 w-full relative bg-gray-100">
        {book.cover_url ? (
            <Image
            src={book.cover_url}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
        )}
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium">คลิกเพื่ออ่านรีวิว</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex text-yellow-400 gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              // ใช้ตัวแปร rating ที่เรากันกระแทกไว้แล้ว
              fill={i < rating ? "currentColor" : "none"} 
              className={i < rating ? "text-yellow-400" : "text-gray-300"} 
            />
          ))}
        </div>
        <h3 className="font-bold text-gray-900 text-l leading-tight line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
          {book.title}
        </h3>
        {/* กันกระแทก: ถ้าไม่มีผู้แต่ง ให้แสดงเป็นขีด - */}
        <p className="text-gray-500 text-sm">{book.author || '-'}</p>
      </div>
    </Link>
  );
}