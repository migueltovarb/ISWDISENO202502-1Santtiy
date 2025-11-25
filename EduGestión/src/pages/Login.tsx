import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  Link,
  Avatar,
  CssBaseline,
} from '@mui/material'
import { School } from '@mui/icons-material'
import { useAuth } from '../contexts/AuthContext'

interface LoginFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = React.useState<string>('')
  const [loading, setLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    setError('')

    try {
      const success = await login(data.email, data.password)
      if (success) {
        // Redirect based on user role
        if (data.email.includes('admin')) {
          navigate('/admin/dashboard')
        } else if (data.email.includes('instructor')) {
          navigate('/instructor/dashboard')
        } else {
          navigate('/student/dashboard')
        }
      } else {
        setError('Credenciales inválidas. Por favor, intente nuevamente.')
      }
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
            <School sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
            EduGestión
          </Typography>
          <Typography component="h2" variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
            Iniciar Sesión
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Correo electrónico inválido',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Link href="#" variant="body2" sx={{ color: 'primary.main' }}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              💡 Demo: Use emails con "admin", "instructor" o "student" para probar diferentes roles
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Login