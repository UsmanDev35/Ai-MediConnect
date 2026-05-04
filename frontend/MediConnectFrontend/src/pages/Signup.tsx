import React, { useState } from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';
import { registerUser } from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData.fullName, formData.email);
      alert("Success! Check your email for your password.");
    } catch (error: any) {
      // THIS LINE IS KEY: It will show the exact error in your browser F12 console
      console.error("Full Error Object:", error);
      
      if (error.response) {
        console.error("Server Data:", error.response.data);
        console.error("Server Status:", error.response.status);
      }
      alert("Registration failed. Open Console (F12) to see why!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
        <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
        <p className="text-slate-500 mt-2 mb-8">Enter your details to receive your secure password.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input 
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Usman Shahid"
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input 
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="name@university.edu"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {loading ? "Registering..." : "Send My Password"}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;