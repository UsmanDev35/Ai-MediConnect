import axios from 'axios';

const API_URL = 'http://localhost:5020/api/auth'; // Replace with your backend port

export const registerUser = async (fullName: string, email: string) => {
  // This matches your C# [HttpPost("register")]
  const response = await axios.post(`${API_URL}/register`, { fullName, email });
  return response.data;
};



// Add this to your existing file
export const loginUser = async (email: string, password: string) => {
  // This will hit your C# [HttpPost("login")] endpoint
  const response = await axios.post(`${API_URL}/login`, { email, password });
  
  // Professional tip: Store the JWT token in localStorage for session persistence
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};