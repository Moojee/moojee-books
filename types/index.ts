export interface Book {
  id: string;          // รองรับ UUID จาก Supabase
  title: string;       // ชื่อหนังสือ
  author: string | null; // ชื่อผู้แต่ง (อาจจะไม่มีค่าก็ได้ เลยใส่ | null)
  review: string | null; // เนื้อหารีวิว
  rating: number | null; // คะแนน
  cover_url: string | null; // ลิงก์รูปภาพ
  tags?: string[];      // แท็ก (Optional มีหรือไม่ก็ได้)
  is_read?: boolean;    // อ่านจบหรือยัง
  created_at?: string;  // วันที่สร้าง
}