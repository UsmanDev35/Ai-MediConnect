// import React, { useState } from 'react';
// import { Mail, User, ArrowRight } from 'lucide-react';
// import { registerUser } from '../services/authService';

// const Signup = () => {
//   const [formData, setFormData] = useState({ fullName: '', email: '' });
//   const [loading, setLoading] = useState(false);

// const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await registerUser(formData.fullName, formData.email);
//       alert("Success! Check your email for your password.");
//     } catch (error: any) {
//       // THIS LINE IS KEY: It will show the exact error in your browser F12 console
//       console.error("Full Error Object:", error);
      
//       if (error.response) {
//         console.error("Server Data:", error.response.data);
//         console.error("Server Status:", error.response.status);
//       }
//       alert("Registration failed. Open Console (F12) to see why!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-6">
//       <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
//         <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
//         <p className="text-slate-500 mt-2 mb-8">Enter your details to receive your secure password.</p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700">Full Name</label>
//             <div className="relative mt-1">
//               <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
//               <input 
//                 type="text"
//                 required
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                 placeholder="Usman Shahid"
//                 onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700">Email Address</label>
//             <div className="relative mt-1">
//               <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
//               <input 
//                 type="email"
//                 required
//                 className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                 placeholder="name@university.edu"
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />
//             </div>
//           </div>

//           <button 
//             disabled={loading}
//             className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
//           >
//             {loading ? "Registering..." : "Send My Password"}
//             <ArrowRight className="h-5 w-5" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     age: '',
//     role: 'Patient' // Default role
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   try {
//   //     // Talking to your .NET [HttpPost("register")]
//   //     const response = await axios.post('http://localhost:5020/api/auth/register', formData);
//   //     alert(response.data.message);
//   //   } catch (error: any) {
//   //     alert(error.response?.data || "Something went wrong");
//   //   }
//   // };
// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   try {
//     // 1. Prepare the payload to match C# DTO perfectly
//     const payload = {
//       fullName: formData.fullName,
//       email: formData.email,
//       age: parseInt(formData.age), // Convert string "20" to number 20
//       role: formData.role,
//       password: "PlaceholderPassword123!" // Add this if your DTO requires it
//     };

//     // 2. Send the cleaned payload
//     const response = await axios.post('http://localhost:5020/api/auth/register', payload);
    
//     alert(response.data.message);
//   } catch (error: any) {
//     // This will now show the SPECIFIC error message from your C# Exception
//     const errorMessage = error.response?.data?.message || error.response?.data || "Something went wrong";
//     alert(errorMessage);
//   }
// };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
//       {/* motion.div gives us the smooth entry animation */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100"
//       >
//         <h2 className="text-3xl font-bold text-slate-800 mb-2">Join MediConnect</h2>
//         <p className="text-slate-500 mb-6">Create your account to get started.</p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="Usman Shahid"
//               required
//             />
//           </div>

//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-slate-700">Age</label>
//               <input
//                 type="number"
//                 name="age"
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//                 placeholder="20"
//                 required
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-slate-700">Role</label>
//               <select
//                 name="role"
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//               >
//                 <option value="Patient">Patient</option>
//                 <option value="Doctor">Doctor</option>
//                 <option value="AmbulanceDriver">Ambulance Driver</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               onChange={handleChange}
//               className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
//               placeholder="name@example.com"
//               required
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition duration-300 shadow-indigo-200"
//           >
//             Register Now
//           </motion.button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     age: '',
//     role: 'Patient',
//     city: '',
//     // Doctor Specific
//     pmdcNumber: '',
//     specialization: '',
//     experience: '',
//     // Ambulance Specific
//     vehicleNumber: '',
//     hasOxygen: false,
//     hasStretcher: false
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     // Handle checkboxes for ambulance equipment
//     const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
//     setFormData({ ...formData, [name]: val });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         age: parseInt(formData.age),
//         password: "PlaceholderPassword123!" 
//       };
//       const response = await axios.post('http://localhost:5020/api/auth/register', payload);
//       alert(response.data.message);
//     } catch (error: any) {
//       alert(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
//       <motion.div layout className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-slate-100">
//         <h2 className="text-3xl font-bold text-slate-800 mb-2">Join MediConnect</h2>
//         <p className="text-slate-500 mb-6">Register as a {formData.role} to continue.</p>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Common Fields */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="col-span-2">
//               <label className="text-sm font-medium text-slate-700">Full Name</label>
//               <input type="text" name="fullName" onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-slate-700">Age</label>
//               <input type="number" name="age" onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
//             </div>
//             <div>
//               <label className="text-sm font-medium text-slate-700">Role</label>
//               <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border rounded-lg">
//                 <option value="Patient">Patient</option>
//                 <option value="Doctor">Doctor</option>
//                 <option value="AmbulanceDriver">Ambulance Driver</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="text-sm font-medium text-slate-700">City</label>
//             <input type="text" name="city" onChange={handleChange} required className="w-full px-4 py-2 bg-slate-50 border rounded-lg" />
//           </div>

//           {/* Conditional Fields for Doctor */}
//           <AnimatePresence>
//             {formData.role === 'Doctor' && (
//               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden">
//                 <div className="border-t pt-4">
//                   <label className="text-sm font-semibold text-indigo-600">Doctor Professional Details</label>
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <input type="text" name="pmdcNumber" placeholder="PMDC Registration #" onChange={handleChange} required className="col-span-2 px-4 py-2 bg-indigo-50 border-indigo-100 border rounded-lg" />
//                     <input type="text" name="specialization" placeholder="Specialization (e.g. Cardiologist)" onChange={handleChange} required className="px-4 py-2 bg-slate-50 border rounded-lg" />
//                     <input type="number" name="experience" placeholder="Years of Exp." onChange={handleChange} required className="px-4 py-2 bg-slate-50 border rounded-lg" />
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Conditional Fields for Ambulance Driver */}
//             {formData.role === 'AmbulanceDriver' && (
//               <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-4 overflow-hidden">
//                 <div className="border-t pt-4">
//                   <label className="text-sm font-semibold text-red-600">Vehicle Requirements</label>
//                   <input type="text" name="vehicleNumber" placeholder="Vehicle Reg Number (e.g. LEC-1234)" onChange={handleChange} required className="w-full mt-2 px-4 py-2 bg-red-50 border-red-100 border rounded-lg" />
//                   <div className="flex gap-6 mt-4">
//                     <label className="flex items-center gap-2 text-sm text-slate-700">
//                       <input type="checkbox" name="hasOxygen" onChange={handleChange} /> Oxygen Cylinder
//                     </label>
//                     <label className="flex items-center gap-2 text-sm text-slate-700">
//                       <input type="checkbox" name="hasStretcher" onChange={handleChange} /> Stretcher
//                     </label>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition">
//             Register as {formData.role}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Signup;






// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User,
//   Mail,
//   Lock,
//   MapPin,
//   HeartPulse,
//   Ambulance,
//   Stethoscope,
//   Eye,
//   EyeOff,
//   ShieldCheck,
// } from "lucide-react";

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     city: "",
//     age: "",
//     role: "Patient",

//     // Doctor
//     pmdcNumber: "",
//     specialization: "",
//     experience: "",

//     // Ambulance
//     vehicleNumber: "",
//     hasOxygen: false,
//     hasStretcher: false,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value, type, checked } = e.target;

//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const roles = [
//     {
//       title: "Patient",
//       icon: HeartPulse,
//       desc: "Book appointments & healthcare support",
//       color: "from-cyan-500 to-blue-500",
//     },
//     {
//       title: "Doctor",
//       icon: Stethoscope,
//       desc: "Manage patients professionally",
//       color: "from-indigo-500 to-violet-500",
//     },
//     {
//       title: "AmbulanceDriver",
//       icon: Ambulance,
//       desc: "Emergency medical response",
//       color: "from-red-500 to-orange-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen overflow-hidden bg-[#f4f7ff] relative flex items-center justify-center p-6">
//       {/* Background Glow */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-300/30 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-300/30 blur-3xl rounded-full" />

//       {/* Main Container */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-7xl rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] border border-white/40 backdrop-blur-xl bg-white/70"
//       >
//         <div className="grid lg:grid-cols-2">
//           {/* LEFT SIDE */}
//           <div className="hidden lg:flex relative bg-gradient-to-br from-indigo-600 via-cyan-500 to-blue-500 p-12 text-white flex-col justify-between overflow-hidden">
//             {/* Decorative */}
//             <div className="absolute top-10 right-10 w-40 h-40 border border-white/20 rounded-full" />
//             <div className="absolute bottom-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

//             <div className="relative z-10">
//               <div className="flex items-center gap-3">
//                 <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
//                   <HeartPulse size={30} />
//                 </div>

//                 <div>
//                   <h1 className="text-3xl font-black">
//                     MediConnect
//                   </h1>
//                   <p className="text-white/80">
//                     Smart Healthcare Platform
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-20">
//                 <motion.h2
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="text-5xl font-black leading-tight"
//                 >
//                   Healthcare
//                   <br />
//                   Made
//                   <br />
//                   Modern.
//                 </motion.h2>

//                 <p className="mt-6 text-lg text-white/80 max-w-md leading-relaxed">
//                   Connect patients, doctors, and emergency
//                   services with a seamless futuristic healthcare
//                   ecosystem.
//                 </p>
//               </div>
//             </div>

//             {/* Bottom Stats */}
//             <div className="grid grid-cols-3 gap-4 relative z-10">
//               <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
//                 <h3 className="text-2xl font-black">24/7</h3>
//                 <p className="text-sm text-white/70">
//                   Support
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
//                 <h3 className="text-2xl font-black">1K+</h3>
//                 <p className="text-sm text-white/70">
//                   Doctors
//                 </p>
//               </div>

//               <div className="bg-white/10 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
//                 <h3 className="text-2xl font-black">99%</h3>
//                 <p className="text-sm text-white/70">
//                   Secure
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="p-8 lg:p-12">
//             {/* Header */}
//             <div className="mb-8">
//               <div className="flex items-center gap-2 text-indigo-600 font-semibold">
//                 <ShieldCheck size={18} />
//                 Secure Registration
//               </div>

//               <h2 className="text-4xl font-black text-slate-800 mt-3">
//                 Create Account
//               </h2>

//               <p className="text-slate-500 mt-2">
//                 Join the next generation healthcare platform.
//               </p>
//             </div>

//             {/* Progress */}
//             <div className="flex gap-2 mb-10">
//               <div className="h-2 rounded-full bg-indigo-600 flex-1" />
//               <div className="h-2 rounded-full bg-cyan-500 flex-1" />
//               <div className="h-2 rounded-full bg-slate-200 flex-1" />
//             </div>

//             {/* Role Cards */}
//             <div className="grid grid-cols-3 gap-4 mb-8">
//               {roles.map((role) => {
//                 const Icon = role.icon;

//                 return (
//                   <motion.button
//                     whileHover={{ y: -5 }}
//                     whileTap={{ scale: 0.97 }}
//                     key={role.title}
//                     type="button"
//                     onClick={() =>
//                       setFormData({
//                         ...formData,
//                         role: role.title,
//                       })
//                     }
//                     className={`relative overflow-hidden rounded-3xl border p-5 text-left transition-all ${
//                       formData.role === role.title
//                         ? "border-transparent shadow-2xl text-white"
//                         : "border-slate-200 bg-white"
//                     }`}
//                   >
//                     {formData.role === role.title && (
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-br ${role.color}`}
//                       />
//                     )}

//                     <div className="relative z-10">
//                       <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
//                         <Icon size={24} />
//                       </div>

//                       <h3 className="font-bold mt-4">
//                         {role.title === "AmbulanceDriver"
//                           ? "Ambulance"
//                           : role.title}
//                       </h3>

//                       <p
//                         className={`text-xs mt-1 ${
//                           formData.role === role.title
//                             ? "text-white/80"
//                             : "text-slate-500"
//                         }`}
//                       >
//                         {role.desc}
//                       </p>
//                     </div>
//                   </motion.button>
//                 );
//               })}
//             </div>

//             {/* Form */}
//             <form className="space-y-5">
//               {/* Full Name */}
//               <InputField
//                 icon={<User size={18} />}
//                 label="Full Name"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//               />

//               {/* Email */}
//               <InputField
//                 icon={<Mail size={18} />}
//                 label="Email Address"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />

//               {/* Password */}
//               <div className="relative">
//                 <Lock
//                   size={18}
//                   className="absolute left-4 top-5 text-slate-400"
//                 />

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-14 py-4 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all"
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowPassword(!showPassword)
//                   }
//                   className="absolute right-4 top-5 text-slate-400"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>
//               </div>

//               {/* City & Age */}
//               <div className="grid md:grid-cols-2 gap-5">
//                 <InputField
//                   icon={<MapPin size={18} />}
//                   label="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />

//                 <InputField
//                   icon={<User size={18} />}
//                   label="Age"
//                   name="age"
//                   type="number"
//                   value={formData.age}
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Doctor Section */}
//               <AnimatePresence>
//                 {formData.role === "Doctor" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="rounded-3xl p-6 bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100"
//                   >
//                     <h3 className="font-bold text-indigo-700 mb-5 text-lg">
//                       Doctor Professional Details
//                     </h3>

//                     <div className="space-y-4">
//                       <InputField
//                         label="PMDC Registration Number"
//                         name="pmdcNumber"
//                         value={formData.pmdcNumber}
//                         onChange={handleChange}
//                       />

//                       <div className="grid md:grid-cols-2 gap-4">
//                         <InputField
//                           label="Specialization"
//                           name="specialization"
//                           value={formData.specialization}
//                           onChange={handleChange}
//                         />

//                         <InputField
//                           label="Experience"
//                           name="experience"
//                           type="number"
//                           value={formData.experience}
//                           onChange={handleChange}
//                         />
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Ambulance */}
//               <AnimatePresence>
//                 {formData.role === "AmbulanceDriver" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="rounded-3xl p-6 bg-gradient-to-br from-red-50 to-orange-50 border border-red-100"
//                   >
//                     <h3 className="font-bold text-red-600 mb-5 text-lg">
//                       Ambulance Details
//                     </h3>

//                     <InputField
//                       label="Vehicle Registration Number"
//                       name="vehicleNumber"
//                       value={formData.vehicleNumber}
//                       onChange={handleChange}
//                     />

//                     <div className="flex gap-8 mt-5">
//                       <label className="flex items-center gap-3 text-slate-700 font-medium">
//                         <input
//                           type="checkbox"
//                           name="hasOxygen"
//                           onChange={handleChange}
//                           className="w-5 h-5 rounded"
//                         />
//                         Oxygen Cylinder
//                       </label>

//                       <label className="flex items-center gap-3 text-slate-700 font-medium">
//                         <input
//                           type="checkbox"
//                           name="hasStretcher"
//                           onChange={handleChange}
//                           className="w-5 h-5 rounded"
//                         />
//                         Stretcher
//                       </label>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* Button */}
//               <motion.button
//                 whileHover={{ scale: 1.01 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 className="w-full mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-cyan-500 to-blue-500 py-4 text-white font-bold text-lg shadow-[0_10px_40px_rgba(79,70,229,0.4)]"
//               >
//                 <span className="relative z-10">
//                   Create Your Account
//                 </span>

//                 <motion.div
//                   animate={{ x: ["-100%", "100%"] }}
//                   transition={{
//                     repeat: Infinity,
//                     duration: 2,
//                     ease: "linear",
//                   }}
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                 />
//               </motion.button>

//               <p className="text-center text-sm text-slate-500 mt-5">
//                 Already have an account?
//                 <span className="text-indigo-600 font-semibold cursor-pointer ml-1">
//                   Sign In
//                 </span>
//               </p>
//             </form>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// interface InputProps {
//   icon?: React.ReactNode;
//   label: string;
//   name: string;
//   value?: string;
//   type?: string;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
// }

// const InputField = ({
//   icon,
//   label,
//   name,
//   value,
//   type = "text",
//   onChange,
// }: InputProps) => {
//   return (
//     <div className="relative">
//       {icon && (
//         <div className="absolute left-4 top-5 text-slate-400">
//           {icon}
//         </div>
//       )}

//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={label}
//         className={`w-full ${
//           icon ? "pl-12" : "pl-4"
//         } pr-4 py-4 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all`}
//       />
//     </div>
//   );
// };

// export default Signup;










import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Lock, MapPin, HeartPulse, Ambulance, Stethoscope,
  Eye, EyeOff, ShieldCheck, Phone, CreditCard, FileText, Upload,
  Car, Briefcase, ChevronRight, Check, ArrowLeft, Award, Hash,
  Calendar, Heart,
} from "lucide-react";

// ─── EXACT DASHBOARD PALETTE ─────────────────────────────────────────────────
const C = {
  navyDeep:    "#060D18",  // dashboard dark bg
  navy:        "#0A1628",  // dashboard sidebar
  navyCard:    "#0D1F35",  // dashboard dark cards
  navyBorder:  "#1E2D45",  // dashboard dark borders
  navyMid:     "#162940",
  navyMuted:   "#4A6080",  // dashboard sidebar muted text
  crimson:     "#C8102E",  // dashboard primary accent
  crimsonHov:  "#A30D26",
  teal:        "#0891B2",  // dashboard teal accent
  violet:      "#7C3AED",  // dashboard violet accent
  emerald:     "#059669",  // dashboard green accent
  amber:       "#F59E0B",  // dashboard amber accent
  bgLight:     "#F0F4F8",  // dashboard light page bg
  cardLight:   "#FFFFFF",  // dashboard light cards
  borderLight: "#E2E8F0",  // dashboard light borders
  textDark:    "#0A1628",  // dashboard primary text
  textMuted:   "#64748B",  // dashboard subtext
  softLight:   "#F8FAFC",  // dashboard soft bg
};

type Role = "Patient" | "Doctor" | "AmbulanceDriver";

interface FormData {
  fullName: string; email: string; password: string; city: string; age: string; role: Role;
  pmdcNumber: string; specialization: string; experience: string;
  certificateImageUrl: string; _certificateFile: File | null;
  cnic: string; mobileNumber: string; drivingLicenseNumber: string;
  licenseImageUrl: string; _licenseFile: File | null;
  vehicleNumber: string; ambulanceType: string; driverExperience: string;
  hasOxygen: boolean; hasStretcher: boolean;
}

// ─── FILE UPLOAD ZONE ────────────────────────────────────────────────────────
const FileUploadZone = ({ label, hint, file, onFile }: {
  label: string; hint: string; file: File | null; onFile: (f: File) => void;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => ref.current?.click()}
      style={{
        borderColor: file ? C.emerald : dragging ? C.crimson : C.borderLight,
        backgroundColor: file ? "#F0FDF4" : dragging ? "#FEF2F2" : C.softLight,
        borderWidth: 2, borderStyle: "dashed", borderRadius: 12,
        padding: "18px 16px", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", cursor: "pointer",
        transition: "all 0.25s", minHeight: 90,
      }}
    >
      <input ref={ref} type="file" accept="image/*,.pdf" style={{ display: "none" }}
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={18} style={{ color: C.emerald }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.emerald, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</p>
            <p style={{ fontSize: 11, color: "#6EE7B7" }}>Click to replace</p>
          </motion.div>
        ) : (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Upload size={16} style={{ color: C.textMuted }} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.textDark }}>{label}</p>
            <p style={{ fontSize: 11, color: C.textMuted }}>{hint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
const Field = ({ icon, label, name, value, type = "text", onChange, select, options }: {
  icon?: React.ReactNode; label: string; name: string; value: string; type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  select?: boolean; options?: string[];
}) => {
  const [focused, setFocused] = useState(false);
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    paddingLeft: icon ? 40 : 14,
    paddingRight: 14,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 10,
    border: `1px solid ${focused ? C.crimson : C.borderLight}`,
    boxShadow: focused ? `0 0 0 3px ${C.crimson}18` : "none",
    fontSize: 13,
    fontWeight: 500,
    color: C.textDark,
    backgroundColor: "white",
    outline: "none",
    transition: "all 0.2s",
    appearance: "none" as const,
  };

  return (
    <div style={{ position: "relative" }}>
      {icon && (
        <div style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          color: focused ? C.crimson : "#CBD5E1", transition: "color 0.2s", zIndex: 1,
        }}>
          {icon}
        </div>
      )}
      {select ? (
        <select name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle}>
          <option value="" disabled>{label}</option>
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} placeholder={label}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle} />
      )}
    </div>
  );
};

// ─── PASSWORD FIELD ──────────────────────────────────────────────────────────
const PasswordField = ({ value, onChange, show, onToggle }: {
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean; onToggle: () => void;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Lock size={15} style={{
        position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
        color: focused ? C.crimson : "#CBD5E1", transition: "color 0.2s",
      }} />
      <input type={show ? "text" : "password"} name="password" value={value}
        placeholder="Password" onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          width: "100%", paddingLeft: 40, paddingRight: 44, paddingTop: 12, paddingBottom: 12,
          borderRadius: 10, border: `1px solid ${focused ? C.crimson : C.borderLight}`,
          boxShadow: focused ? `0 0 0 3px ${C.crimson}18` : "none",
          fontSize: 13, fontWeight: 500, color: C.textDark, backgroundColor: "white",
          outline: "none", transition: "all 0.2s",
        }} />
      <button type="button" onClick={onToggle} style={{
        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
        color: C.textMuted, background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center",
      }}>
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  );
};

// ─── SECTION BOX (matches dashboard card style) ───────────────────────────────
const Section = ({ icon, iconBg, iconColor, title, sub, children }: {
  icon: React.ReactNode; iconBg: string; iconColor: string;
  title: string; sub: string; children: React.ReactNode;
}) => (
  <div style={{ borderRadius: 12, border: `1px solid ${C.borderLight}`, backgroundColor: C.softLight, padding: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, marginBottom: 14, borderBottom: `1px solid ${C.borderLight}` }}>
      <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 800, color: C.textDark, margin: 0 }}>{title}</p>
        <p style={{ fontSize: 11, color: C.textMuted, margin: 0, marginTop: 1 }}>{sub}</p>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{children}</div>
  </div>
);

// ─── SIDEBAR DECORATIVE BG ────────────────────────────────────────────────────
const SidebarBg = () => (
  <>
    <div style={{
      position: "absolute", inset: 0, opacity: 0.04,
      backgroundImage: `linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)`,
      backgroundSize: "32px 32px",
    }} />
    <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${C.crimson}22 0%, transparent 70%)` }} />
    <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.teal}18 0%, transparent 70%)` }} />
    <motion.div
      style={{ position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", width: 460, height: 460, borderRadius: "50%", border: `1px solid ${C.crimson}12` }}
      animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} />
    <motion.div
      style={{ position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%", width: 320, height: 320, borderRadius: "50%", border: `1px solid ${C.teal}10` }}
      animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} />
    <svg style={{ position: "absolute", bottom: 100, left: 0, right: 0, width: "100%", opacity: 0.12 }} viewBox="0 0 380 60" preserveAspectRatio="none">
      <motion.polyline points="0,30 55,30 75,8 92,52 110,4 128,52 145,30 380,30"
        fill="none" stroke={C.crimson} strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, delay: 0.6, ease: "easeInOut" }} />
    </svg>
  </>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const Signup = () => {
  const [step, setStep]               = useState<1 | 2>(1);
  const [showPass, setShowPass]       = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  const [fd, setFd] = useState<FormData>({
    fullName: "", email: "", password: "", city: "", age: "", role: "Patient",
    pmdcNumber: "", specialization: "", experience: "", certificateImageUrl: "", _certificateFile: null,
    cnic: "", mobileNumber: "", drivingLicenseNumber: "", licenseImageUrl: "", _licenseFile: null,
    vehicleNumber: "", ambulanceType: "", driverExperience: "", hasOxygen: false, hasStretcher: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const t = e.target as HTMLInputElement;
    setFd((p) => ({ ...p, [t.name]: t.type === "checkbox" ? t.checked : t.value }));
  };

  const roles: { title: Role; icon: typeof HeartPulse; label: string; desc: string; accent: string; bg: string; ibg: string }[] = [
    { title: "Patient",         icon: HeartPulse,  label: "Patient",          desc: "Book appointments",       accent: C.teal,    bg: "#EFF6FF", ibg: "#DBEAFE" },
    { title: "Doctor",          icon: Stethoscope, label: "Doctor",           desc: "Manage & consult",        accent: C.violet,  bg: "#F5F3FF", ibg: "#EDE9FE" },
    { title: "AmbulanceDriver", icon: Ambulance,   label: "Ambulance Driver", desc: "Emergency response",      accent: C.crimson, bg: "#FEF2F2", ibg: "#FEE2E2" },
  ];

  const sel  = roles.find((r) => r.title === fd.role)!;
  const acc  = sel.accent;
  const ok1  = fd.fullName && fd.email && fd.password;

  const AMBULANCE_TYPES  = ["Basic Life Support (BLS)", "Advanced Life Support (ALS)", "Critical Care Transport", "Neonatal Transport", "Air Ambulance Support"];
  const SPECIALIZATIONS  = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Oncology", "Radiology", "Emergency Medicine", "General Surgery", "Psychiatry", "Dermatology"];

  // ── SUCCESS ─────────────────────────────────────────────────────────────────
  if (submitted) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.bgLight, padding: 24, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        style={{ background: "white", borderRadius: 24, padding: 48, textAlign: "center", maxWidth: 360, width: "100%", boxShadow: "0 20px 60px rgba(10,22,40,0.14)", border: `1px solid ${C.borderLight}` }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
          style={{ width: 72, height: 72, borderRadius: 18, backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <ShieldCheck size={32} style={{ color: C.emerald }} />
        </motion.div>
        <div style={{ width: 32, height: 3, borderRadius: 9, backgroundColor: C.crimson, margin: "0 auto 16px" }} />
        <h2 style={{ fontSize: 22, fontWeight: 900, color: C.textDark, margin: "0 0 8px" }}>Account Created</h2>
        <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 28, lineHeight: 1.6 }}>
          Your {fd.role === "AmbulanceDriver" ? "ambulance driver" : fd.role.toLowerCase()} account is pending verification by the MediCore team.
        </p>
        <button onClick={() => { setSubmitted(false); setStep(1); }}
          style={{ fontSize: 13, fontWeight: 700, color: C.crimson, background: "none", border: "none", cursor: "pointer" }}>
          ← Back to Sign In
        </button>
      </motion.div>
    </div>
  );

  // ── MAIN ────────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.bgLight, padding: "24px 16px", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 960, borderRadius: 24, overflow: "hidden", boxShadow: "0 28px 80px rgba(10,22,40,0.18)", display: "grid", gridTemplateColumns: "320px 1fr" }}>

        {/* ── SIDEBAR (dashboard-identical dark navy) ── */}
        <div style={{ backgroundColor: C.navy, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}
          className="hidden lg:flex">
          <SidebarBg />

          {/* Logo — same as dashboard */}
          <div style={{ position: "relative", zIndex: 10, padding: "28px 28px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: C.crimson, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 20px ${C.crimson}40` }}>
                <HeartPulse size={20} color="white" />
              </div>
              <div>
                <p style={{ color: "white", fontSize: 16, fontWeight: 900, margin: 0, letterSpacing: "-0.3px" }}>MediCore</p>
                <p style={{ color: C.navyMuted, fontSize: 11, margin: 0 }}>Enterprise Health OS</p>
              </div>
            </div>
          </div>

          {/* Live status pill — matches dashboard exactly */}
          <div style={{ position: "relative", zIndex: 10, margin: "18px 20px 0", padding: "12px 14px", borderRadius: 12, backgroundColor: C.navyDeep, border: `1px solid ${C.navyBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.emerald, flexShrink: 0 }} className="animate-pulse" />
            <div>
              <p style={{ color: "white", fontSize: 12, fontWeight: 600, margin: 0 }}>Live — Registration Open</p>
              <p style={{ color: C.navyMuted, fontSize: 11, margin: 0 }}>Secure · Encrypted · Verified</p>
            </div>
          </div>

          {/* Headline */}
          <div style={{ position: "relative", zIndex: 10, padding: "28px 28px 0", flex: 1 }}>
            <p style={{ color: C.crimson, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>Trusted Healthcare Platform</p>
            <h2 style={{ color: "white", fontSize: 36, fontWeight: 900, lineHeight: 1.15, margin: "0 0 16px" }}>
              Healthcare<br />Made<br />
              <span style={{ position: "relative", display: "inline-block" }}>
                Modern.
                <motion.div style={{ position: "absolute", bottom: -2, left: 0, height: 3, borderRadius: 9, backgroundColor: C.crimson }}
                  initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }} />
              </span>
            </h2>
            <p style={{ color: C.navyMuted, fontSize: 13, lineHeight: 1.65, margin: 0 }}>
              Join MediCore's ecosystem connecting patients, specialists and emergency responders across Pakistan.
            </p>

            {/* Role preview card — matches dashboard card style */}
            <AnimatePresence mode="wait">
              <motion.div key={fd.role} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                style={{ marginTop: 24, borderRadius: 14, padding: 16, backgroundColor: C.navyCard, border: `1px solid ${C.navyBorder}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${acc}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {React.createElement(sel.icon, { size: 17, style: { color: acc } })}
                  </div>
                  <div>
                    <p style={{ color: "white", fontSize: 13, fontWeight: 700, margin: 0 }}>{sel.label}</p>
                    <p style={{ color: C.navyMuted, fontSize: 11, margin: 0 }}>{sel.desc}</p>
                  </div>
                </div>
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.navyBorder}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: C.emerald, flexShrink: 0 }} />
                  <span style={{ color: C.navyMuted, fontSize: 11 }}>Registration currently open</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stats bar — same as dashboard */}
          <div style={{ position: "relative", zIndex: 10, padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[
              { val: "24/7", label: "Support" },
              { val: "1K+",  label: "Doctors"  },
              { val: "99%",  label: "Secure"   },
            ].map((s, i) => (
              <div key={i} style={{ borderRadius: 12, padding: "10px 8px", textAlign: "center", backgroundColor: C.navyCard, border: `1px solid ${C.navyBorder}` }}>
                <p style={{ color: "white", fontSize: 18, fontWeight: 900, margin: 0 }}>{s.val}</p>
                <p style={{ color: C.navyMuted, fontSize: 11, margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FORM PANEL ── */}
        <div style={{ backgroundColor: "white", overflowY: "auto", maxHeight: "100vh" }}>
          <div style={{ padding: "32px 36px" }}>

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.crimson }}>
                <ShieldCheck size={14} /> Secure Registration
              </div>
              {/* Step pills */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {[1, 2].map((s) => (
                  <motion.div key={s} layout style={{
                    height: 7, borderRadius: 99, transition: "all 0.3s",
                    width: step === s ? 20 : 7,
                    backgroundColor: s < step ? C.emerald : step === s ? C.crimson : C.borderLight,
                  }} />
                ))}
              </div>
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 900, color: C.textDark, margin: "10px 0 4px" }}>
              {step === 1 ? "Create Account" : "Professional Details"}
            </h2>
            <p style={{ fontSize: 12, color: C.textMuted, margin: "0 0 18px" }}>
              {step === 1 ? "Choose your role and set up credentials" : "Complete your profile to get verified"}
            </p>

            {/* Progress bar */}
            <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
              {[1, 2].map((s) => (
                <div key={s} style={{ height: 4, borderRadius: 99, flex: 1, backgroundColor: s <= step ? C.crimson : C.borderLight, transition: "background-color 0.4s" }} />
              ))}
            </div>

             <form
  onSubmit={(e) => {
    e.preventDefault();
    setSubmitted(true);
  }}
>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 18,
    }}
  >

    {/* ROLE CARDS */}
    <div>
      <p
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: C.textMuted,
          marginBottom: 10,
        }}
      >
        Select Your Role
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
        }}
      >
        {roles.map((role) => {
          const Icon = role.icon;
          const active = fd.role === role.title;

          return (
            <motion.button
              key={role.title}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                setFd((p) => ({
                  ...p,
                  role: role.title,
                }))
              }
              style={{
                position: "relative",
                borderRadius: 14,
                padding: "14px 12px",
                textAlign: "left",
                cursor: "pointer",
                border: `2px solid ${
                  active ? role.accent : C.borderLight
                }`,
                backgroundColor: active ? role.bg : C.softLight,
              }}
            >
              {active && (
                <motion.div
                  layoutId="roleCheck"
                  style={{
                    position: "absolute",
                    top: 9,
                    right: 9,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    backgroundColor: role.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Check size={10} color="white" />
                </motion.div>
              )}

              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  backgroundColor: active
                    ? role.ibg
                    : "#F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
              >
                <Icon
                  size={16}
                  style={{
                    color: active
                      ? role.accent
                      : C.textMuted,
                  }}
                />
              </div>

              <p
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: C.textDark,
                  margin: "0 0 2px",
                }}
              >
                {role.label}
              </p>

              <p
                style={{
                  fontSize: 10,
                  color: C.textMuted,
                  margin: 0,
                }}
              >
                {role.desc}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>

    {/* COMMON FIELDS */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <Field
        icon={<User size={15} />}
        label="Full Name"
        name="fullName"
        value={fd.fullName}
        onChange={handleChange}
      />

      <Field
        icon={<Mail size={15} />}
        label="Email Address"
        name="email"
        value={fd.email}
        onChange={handleChange}
        type="email"
      />

      <PasswordField
        value={fd.password}
        onChange={handleChange}
        show={showPass}
        onToggle={() => setShowPass(!showPass)}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        <Field
          icon={<MapPin size={15} />}
          label="City"
          name="city"
          value={fd.city}
          onChange={handleChange}
        />

        <Field
          icon={<Calendar size={15} />}
          label="Age"
          name="age"
          value={fd.age}
          onChange={handleChange}
          type="number"
        />
      </div>
    </div>

    {/* DYNAMIC ROLE EXPANSION */}
    <AnimatePresence mode="wait">

      {/* PATIENT */}
      {fd.role === "Patient" && (
        <motion.div
          key="patient"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          style={{ overflow: "hidden" }}
        >
          <Section
            icon={<Heart size={15} />}
            iconBg="#DBEAFE"
            iconColor={C.teal}
            title="Patient Profile"
            sub="Basic patient account setup"
          >
            <p
              style={{
                fontSize: 13,
                color: C.textMuted,
                lineHeight: 1.6,
              }}
            >
              Your medical profile can be completed later
              after registration.
            </p>
          </Section>
        </motion.div>
      )}

      {/* DOCTOR */}
      {fd.role === "Doctor" && (
        <motion.div
          key="doctor"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          style={{ overflow: "hidden" }}
        >
          <Section
            icon={<Stethoscope size={15} />}
            iconBg="#EDE9FE"
            iconColor={C.violet}
            title="Doctor Professional Details"
            sub="Verified by MediCore team within 24h"
          >
            <Field
              icon={<Hash size={15} />}
              label="PMDC Registration Number"
              name="pmdcNumber"
              value={fd.pmdcNumber}
              onChange={handleChange}
            />

            <Field
              icon={<Award size={15} />}
              label="Specialization"
              name="specialization"
              value={fd.specialization}
              onChange={handleChange}
              select
              options={SPECIALIZATIONS}
            />

            <Field
              icon={<Briefcase size={15} />}
              label="Years of Experience"
              name="experience"
              value={fd.experience}
              onChange={handleChange}
              type="number"
            />
          </Section>
        </motion.div>
      )}

      {/* AMBULANCE */}
      {fd.role === "AmbulanceDriver" && (
        <motion.div
          key="ambulance"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35 }}
          style={{ overflow: "hidden" }}
        >
          <Section
            icon={<Ambulance size={15} />}
            iconBg="#FEE2E2"
            iconColor={C.crimson}
            title="Ambulance Driver Details"
            sub="Emergency dispatch verification"
          >
            <Field
              icon={<CreditCard size={15} />}
              label="CNIC"
              name="cnic"
              value={fd.cnic}
              onChange={handleChange}
            />

            <Field
              icon={<Phone size={15} />}
              label="Mobile Number"
              name="mobileNumber"
              value={fd.mobileNumber}
              onChange={handleChange}
            />

            <Field
              icon={<Car size={15} />}
              label="Vehicle Number"
              name="vehicleNumber"
              value={fd.vehicleNumber}
              onChange={handleChange}
            />
          </Section>
        </motion.div>
      )}
    </AnimatePresence>

    {/* SUBMIT */}
    <motion.button
      type="submit"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: "100%",
        padding: "14px 0",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        backgroundColor: C.crimson,
        color: "white",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      Create My Account
    </motion.button>
  </div>
</form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;


