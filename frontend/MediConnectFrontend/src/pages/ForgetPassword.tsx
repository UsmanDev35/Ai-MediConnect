// import { useState } from "react";
// import { sendOtp, verifyOtp, resetPassword } from "../services/authService";

// type Step = "email" | "otp" | "newPassword" | "success";

// export default function ForgotPassword() {
//   const [step, setStep] = useState<Step>("email");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Step 1: Email submit
//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await sendOtp(email);
//       setStep("otp");
//     } catch (err: any) {
//       setError(err.response?.data || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 2: OTP verify
//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await verifyOtp(email, otp);
//       setStep("newPassword");
//     } catch (err: any) {
//       setError(err.response?.data || "Invalid OTP.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Step 3: New password
//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       await resetPassword(email, otp, newPassword);
//       setStep("success");
//     } catch (err: any) {
//       setError(err.response?.data || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

//         {/* Step 1: Email */}
//         {step === "email" && (
//           <>
//             <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
//             <form onSubmit={handleSendOtp}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Email Address</label>
//                 <input
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//               >
//                 {loading ? "Sending OTP..." : "Send OTP"}
//               </button>
//             </form>
//           </>
//         )}

//         {/* Step 2: OTP */}
//         {step === "otp" && (
//           <>
//             <h2 className="text-2xl font-bold mb-2 text-center">Enter OTP</h2>
//             <p className="text-gray-500 text-sm text-center mb-6">
//               OTP sent to <strong>{email}</strong>
//             </p>
//             <form onSubmit={handleVerifyOtp}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">OTP Code</label>
//                 <input
//                   type="text"
//                   required
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter 6-digit OTP"
//                   maxLength={6}
//                 />
//               </div>
//               {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//               >
//                 {loading ? "Verifying..." : "Verify OTP"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setStep("email")}
//                 className="w-full mt-2 text-sm text-gray-500 hover:underline"
//               >
//                 Back
//               </button>
//             </form>
//           </>
//         )}

//         {/* Step 3: New Password */}
//         {step === "newPassword" && (
//           <>
//             <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
//             <form onSubmit={handleResetPassword}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">New Password</label>
//                 <input
//                   type="password"
//                   required
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter new password"
//                 />
//               </div>
//               {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
//               >
//                 {loading ? "Resetting..." : "Reset Password"}
//               </button>
//             </form>
//           </>
//         )}

//         {/* Step 4: Success */}
//         {step === "success" && (
//           <div className="text-center">
//             <h2 className="text-2xl font-bold mb-4 text-green-600">Password Reset! ✅</h2>
//             <p className="text-gray-500 mb-6">Your password has been reset successfully.</p>
//             <a              
//               href="/login"
//               className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
//             >
//               Go to Login
//             </a>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { sendOtp, verifyOtp, resetPassword } from "../services/authService";

type Step = "email" | "otp" | "newPassword" | "success";

export default function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to extract string from potential error objects
  const formatError = (err: any): string => {
    // Check for standard backend response: { message: "..." }
    if (err.response?.data?.message) return err.response.data.message;
    // Check if the data itself is a string
    if (typeof err.response?.data === 'string') return err.response.data;
    // Fallback
    return "An unexpected error occurred.";
  };

  // Step 1: Email submit
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendOtp(email);
      setStep("otp");
    } catch (err: any) {
      setError(formatError(err)); // Fixed
    } finally {
      setLoading(false);
    }
  };

  // Step 2: OTP verify
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await verifyOtp(email, otp);
      setStep("newPassword");
    } catch (err: any) {
      setError(formatError(err)); // Fixed: This was causing your crash
    } finally {
      setLoading(false);
    }
  };

  // Step 3: New password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await resetPassword(email, otp, newPassword);
      setStep("success");
    } catch (err: any) {
      setError(formatError(err)); // Fixed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

        {/* Step 1: Email */}
        {step === "email" && (
          <>
            <h2 className="text-2xl font-black mb-6 text-center text-slate-800">Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter your email"
                />
              </div>
              {error && <p className="text-red-500 text-sm font-semibold mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition active:scale-95"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: OTP */}
        {step === "otp" && (
          <>
            <h2 className="text-2xl font-black mb-2 text-center text-slate-800">Enter OTP</h2>
            <p className="text-slate-500 text-sm text-center mb-6">
              OTP sent to <span className="font-bold text-slate-700">{email}</span>
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2 ml-1">OTP Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] font-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-red-500 text-sm font-semibold mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition active:scale-95"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition"
              >
                ← Back to Email
              </button>
            </form>
          </>
        )}

        {/* Step 3: New Password */}
        {step === "newPassword" && (
          <>
            <h2 className="text-2xl font-black mb-6 text-center text-slate-800">Set New Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2 ml-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-500 text-sm font-semibold mb-4 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition active:scale-95"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="text-center py-4">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-black mb-2 text-slate-800">Password Reset!</h2>
            <p className="text-slate-500 mb-8">You can now sign in with your new password.</p>
            <a              
              href="/login"
              className="inline-block w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition active:scale-95"
            >
              Go to Login
            </a>
          </div>
        )}

      </div>
    </div>
  );
}