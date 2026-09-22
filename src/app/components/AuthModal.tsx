import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../../lib/supabase';
import { C } from './constants';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose(); // Close modal on success
        navigate('/monitoring'); // Redirect to protected monitoring dashboard
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage('Registrasi berhasil! Cek email untuk verifikasi.');
      }
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md bg-[rgba(0,31,63,0.85)] border border-[rgba(246,247,237,0.1)] rounded-2xl shadow-2xl p-8 overflow-hidden"
            style={{ 
              backdropFilter: 'blur(16px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Glow effect */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${C.lime} 0%, transparent 70%)`, opacity: 0.15 }}
            />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-6" style={{ color: C.white }}>
              {isLogin ? 'Masuk' : 'Daftar Akun'}
            </h2>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm mb-4">
                {error}
              </div>
            )}
            
            {message && (
              <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg text-sm mb-4">
                {message}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'rgba(246,247,237,0.7)' }}>Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[rgba(246,247,237,0.05)] border border-[rgba(246,247,237,0.1)] focus:border-[#dbe64c] focus:outline-none focus:ring-1 focus:ring-[#dbe64c] text-white transition-colors"
                  placeholder="admin@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'rgba(246,247,237,0.7)' }}>Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[rgba(246,247,237,0.05)] border border-[rgba(246,247,237,0.1)] focus:border-[#dbe64c] focus:outline-none focus:ring-1 focus:ring-[#dbe64c] text-white transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all"
                style={{ 
                  backgroundColor: C.lime, 
                  color: C.midnight,
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Memproses...' : isLogin ? 'Masuk' : 'Daftar Sekarang'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: C.lime }}
                className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
              >
                {isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

