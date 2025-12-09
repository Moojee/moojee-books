import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Star } from "lucide-react";
import { notFound } from "next/navigation";

// 1. กำหนด Type ให้ params เป็น Promise
interface BookDetailProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetail({ params }: BookDetailProps) {
  // 2. "แกะ" id ออกมาจาก params ด้วยคำสั่ง await
  const { id } = await params;

  // 3. ใช้ตัวแปร id
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (!book) return notFound();

  // กันกระแทก: ถ้าไม่มีคะแนน ให้เป็น 0
  const rating = book.rating || 0;

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/#showbook"
          className="inline-flex items-center text-gray-500 hover:text-indigo-600 mb-6 font-medium transition-colors"
        >
          <ChevronLeft size={20} /> กลับหน้าหลัก
        </Link>

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden md:flex">
          {/* Cover Section */}
          <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center">
            <div className="relative w-48 aspect-[2/3] shadow-2xl rounded-lg overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500">
              {book.cover_url ? (
                <Image
                  src={book.cover_url}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Cover
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-2/3 p-8 md:p-10">
            <h1 className="text-xl font-extrabold text-gray-900 mb-2">
              {book.title}
            </h1>
            <p className="text-l text-gray-500 mb-6 font-medium">
              โดย {book.author || "-"}
            </p>

            <div className="flex items-center gap-2 mb-8 bg-gray-50 w-fit px-4 py-2 rounded-xl border border-gray-100">
              <span className="text-sm font-semibold text-gray-700">
                Rating:
              </span>
              <div className="flex text-yellow-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < rating ? "currentColor" : "none"}
                    className={i < rating ? "text-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            <div className="prose prose-indigo text-gray-600 leading-relaxed whitespace-pre-line">
              {book.review}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
