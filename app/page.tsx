"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Book } from "@/types";
import BookCard from "@/components/BookCard";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setBooks(data);
        setFilteredBooks(data);
      }
    };
    fetchBooks();
  }, []);

  const handleSearch = (term: string) => {
    const lowerTerm = term.toLowerCase();
    const filtered = books.filter((b) => {
      // กันกระแทก: เช็คว่ามี title ไหม และ เช็คว่ามี author ไหม ก่อนแปลงเป็นตัวเล็ก
      const titleMatch = b.title?.toLowerCase().includes(lowerTerm) || false;
      const authorMatch = b.author?.toLowerCase().includes(lowerTerm) || false;

      return titleMatch || authorMatch;
    });
    setFilteredBooks(filtered);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans pb-20 ">
      <Navbar showSearch={true} onSearch={handleSearch} />
      <HeroSection />

      <main
        id="showbook"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-padding-top "
      >
        <h2
          className=" text-center  mt-12 text-2xl md:text-3xl font-bold mb-12 leading-none text-gray-600"
        > Books Reviews
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center text-gray-400 mt-10">ไม่พบหนังสือ</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
