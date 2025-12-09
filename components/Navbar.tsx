"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
  onSearch?: (term: string) => void;
  showSearch?: boolean;
}

//  State Management (การจัดการสถานะ)
// term = เก็บข้อความที่พิมพ์ใน search bar
// isScrolled = เก็บสถานะว่า scroll ลงมาแล้วหรือยัง (true/false)
// useState = hook ของ React ที่ใช้เก็บข้อมูลที่เปลี่ยนแปลงได้
export default function Navbar({ onSearch, showSearch = false }: NavbarProps) {
  const [term, setTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  //useEffect - ตรวจจับการ Scroll
  /*useEffect = ทำงานตอน component โหลดครั้งแรก
  handleScroll = ฟังก์ชันที่เช็คว่า scroll ลงมาเกิน 100px หรือยัง
  window.scrollY = ระยะที่ scroll ลงมา (เป็น pixel)
    ถ้า > 100 → ตั้ง isScrolled = true
    ถ้า ≤ 100 → ตั้ง isScrolled = false
addEventListener = ฟังเหตุการณ์ scroll
return = cleanup function (ลบ event listener ตอน component ถูกทำลาย เพื่อป้องกัน memory leak)
 */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* handleSearch - จัดการการค้นหา 
  รับ event จาก input field
  ดึงค่าที่พิมพ์มาเก็บใน value
  อัพเดท state term ด้วย setTerm
  ถ้ามี prop onSearch ส่งมา → เรียกใช้ฟังก์ชันนั้นพร้อมส่ง value ไปด้วย (เพื่อให้ parent component ทำงานต่อ)
  */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    if (onSearch) onSearch(value);
  };

  return (
    <nav
      /*Dynamic Styling - สไตล์ที่เปลี่ยนตาม State
      ใช้ template literals (` `) รวม string หลายบรรทัด
      ใช้ ternary operator ? : (เหมือน if-else แบบย่อ)
      ถ้า isScrolled === true → ใช้ class bg-white border-b ...
      ถ้า isScrolled === false → ใช้ class bg-transparent
      transition-all duration-500 = เปลี่ยนแบบ smooth ภายใน 0.5 วินาที
     */
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center transition-all duration-500 ${
            isScrolled ? "justify-between h-16" : "justify-start h-20"
          }`}
        >
          {/* Logo */}
          <Link href="#showbook" className="flex items-center gap-2 group">
            <div
              className={`p-1.5 rounded-lg overflow-hidden transition-all duration-300 ${
                isScrolled ? "bg-gray-50" : "backdrop-blur-sm"
              }`}
            >
              <Image
                src="/bookicon.png"
                alt="Moojee Logo"
                width={36}
                height={36}
                className="w-6 h-6 object-contain"
              />
            </div>

            <span
              className={`font-bold text-xl transition-colors duration-300 ${
                isScrolled ? "text-gray-800" : "text-gray-500"
              }`}
            >
              Moojee
              <span className={isScrolled ? "text-gray-600" : "text-gray-400"}>
                {" "}
                Books
              </span>
            </span>
          </Link>

          {/* Search Bar - แสดงเฉพาะตอน scroll แล้ว */}
          {showSearch && (
            <div
              className={`relative transition-all duration-500 ${
                isScrolled
                  ? "opacity-100 w-40 sm:w-64 translate-x-0"
                  : "opacity-0 w-0 -translate-x-4 pointer-events-none"
              }`}
            >
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
                  <button
                    onClick={() => {
                      setTerm("");
                      if (onSearch) onSearch("");
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
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
