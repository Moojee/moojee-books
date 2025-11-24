import BookForm from '@/components/BookForm';

export default function NewBookPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">เพิ่มหนังสือเล่มใหม่</h1>
      <BookForm mode="create" />
    </div>
  );
}