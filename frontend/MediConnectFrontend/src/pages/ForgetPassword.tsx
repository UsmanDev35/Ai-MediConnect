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

  // Step 1: Email submit
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendOtp(email);
      setStep("otp");
    } catch (err: any) {
      setError(err.response?.data || "Something went wrong.");
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
      setError(err.response?.data || "Invalid OTP.");
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
      setError(err.response?.data || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

        {/* Step 1: Email */}
        {step === "email" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: OTP */}
        {step === "otp" && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-center">Enter OTP</h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              OTP sent to <strong>{email}</strong>
            </p>
            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">OTP Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="w-full mt-2 text-sm text-gray-500 hover:underline"
              >
                Back
              </button>
            </form>
          </>
        )}

        {/* Step 3: New Password */}
        {step === "newPassword" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Set New Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Password Reset! ✅</h2>
            <p className="text-gray-500 mb-6">Your password has been reset successfully.</p>
            <a              
              href="/login"
              className="w-full bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
            >
              Go to Login
            </a>
          </div>
        )}

      </div>
    </div>
  );
}