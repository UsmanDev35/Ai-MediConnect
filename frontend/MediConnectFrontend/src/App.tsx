// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
//  import ForgotPassword from'./pages/ForgetPassword';
//  import MedicalAdminDashboard from './pages/admin/AdmmionDashboard';

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-slate-50">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/" element={<Login />} />
//          <Route path="/forgot-password" element={<ForgotPassword />} />
//          <Route path="/admin/dashboard" element={<MedicalAdminDashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgetPassword';
import MedicalAdminDashboard from './pages/admin/AdmmionDashboard';
import PatientDashboard from './pages/patient/PatientDashboard';

// Inline ProtectedRoute 
const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const userStr = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userStr);
  if (user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin route —*/}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin">
              <MedicalAdminDashboard />
            </ProtectedRoute>
          } />

          {/* Patient route  */}
          <Route path="/patient/dashboard" element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;