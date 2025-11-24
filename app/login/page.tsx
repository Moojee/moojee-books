'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert('Login Failed: ' + error.message);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-indigo-600 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-6">Admin Access</h2>
        <input 
          type="email" placeholder="Email" 
          className="w-full px-4 py-3 rounded-xl border mb-3"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full px-4 py-3 rounded-xl border mb-6"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
          Login
        </button>
      </form>
    </div>
  );
}