import axios from 'axios';

const API_URL = 'http://localhost:5020/api/auth';

// Registration function
export const registerUser = async (fullName: string, email: string) => {
  const response = await axios.post(`${API_URL}/register`, { fullName, email });
  return response.data;
};


// Login function that returns the token on successful login
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};
//forget password related functions
export const sendOtp = async (email: string) => {
  const response = await axios.post(`${API_URL}/send-otp`, { email });
  return response.data;
};
export const verifyOtp = async (email: string, otp: string) => {
  const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
  return response.data;
};
export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  const response = await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
  return response.data;
};