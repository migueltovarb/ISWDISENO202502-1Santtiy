import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './contexts/AuthContext'
import { theme } from './theme/theme'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import StudentLayout from './layouts/StudentLayout'
import InstructorLayout from './layouts/InstructorLayout'
import AdminLayout from './layouts/AdminLayout'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                <ProtectedRoute allowedRoles={['ESTUDIANTE']}>
                  <StudentLayout />
                </ProtectedRoute>
              }
            />
            
            {/* Instructor Routes */}
            <Route
              path="/instructor/*"
              element={
                <ProtectedRoute allowedRoles={['INSTRUCTOR']}>
                  <InstructorLayout />
                </ProtectedRoute>
              }
            />
            
            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['ADMINISTRADOR']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            />
            
            {/* Default redirect */}
            <Route path="/" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App