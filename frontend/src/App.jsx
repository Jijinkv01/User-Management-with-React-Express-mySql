import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './pages/user/Register.jsx'
import Login from './pages/user/Login.jsx'
import VerifyEmail from './pages/user/VerifyEmail.jsx'
import Home from './pages/user/Home.jsx'
import PrivateRoute from './routes/PrivateRoute .jsx'
import PublicRoute from './routes/PublicRoute.jsx'
import ForgotPassword from './pages/user/ForgotPassword.jsx'
import ResetPassword from './pages/user/ResetPassword.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminPrivateRoute from './routes/AdminPrivateRoute.jsx'
import AdminPublicRoute from './routes/AdminPublicRoute.jsx'
import { Toaster } from 'react-hot-toast'


const App = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} toastOptions={{duration: 4000,}}/> 
    <Routes>
      <Route path="/register" element={ <PublicRoute> <Register />  </PublicRoute>  } />
      <Route path="/login" element={ <PublicRoute> <Login />  </PublicRoute>  } />
      <Route path="/forgotPassword" element={ <PublicRoute> <ForgotPassword />  </PublicRoute>  } />
      <Route path="/resetPassword" element={ <PublicRoute> <ResetPassword />  </PublicRoute>  } />
      <Route path="/verifyEmail" element={<VerifyEmail />} />
      <Route path="/" element={ <PrivateRoute> <Home /> </PrivateRoute> } />
      <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute> } />

      <Route path="/admin/login" element={ <AdminPublicRoute> <AdminLogin />  </AdminPublicRoute>    } />
      <Route path="/admin/dashboard" element={ <AdminPrivateRoute> <AdminDashboard /> </AdminPrivateRoute>} />

    </Routes>
    </>
    
  )
}

export default App