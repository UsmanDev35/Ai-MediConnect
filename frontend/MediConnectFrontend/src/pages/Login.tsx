import React, { useState } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { loginUser } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      // If successful, move to the dashboard (we will create this later)
      navigate('/dashboard');
    } catch (error) {
      alert("Invalid credentials. Please check your email for the generated password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <LogIn className="text-white w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Access your AI MediConnect portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="doctor@mediconnect.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-slate-200"
          >
            {loading ? "Verifying..." : "Sign In"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;