import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  GridLegacy as Grid,
  Chip,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import {
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CompletedIcon,
  Schedule as PendingIcon,
} from '@mui/icons-material'

const MyEnrollments: React.FC = () => {
  // Mock data - replace with actual API calls
  const enrollments = [
    {
      id: '1',
      workshopTitle: 'Desarrollo Web con React',
      instructor: 'Juan Pérez',
      date: '2024-12-15',
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      progress: 75,
    },
    {
      id: '2',
      workshopTitle: 'Diseño UX/UI',
      instructor: 'María García',
      date: '2024-12-20',
      status: 'PENDING',
      paymentStatus: 'PENDING',
      progress: 0,
    },
    {
      id: '3',
      workshopTitle: 'Marketing Digital',
      instructor: 'Carlos Rodríguez',
      date: '2024-11-10',
      status: 'COMPLETED',
      paymentStatus: 'PAID',
      progress: 100,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'success'
      case 'PENDING':
        return 'warning'
      case 'COMPLETED':
        return 'info'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CompletedIcon />
      case 'PENDING':
        return <PendingIcon />
      case 'COMPLETED':
        return <CompletedIcon />
      default:
        return <PendingIcon />
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Mis Inscripciones 📋
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <SchoolIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {enrollments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Inscripciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <CompletedIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {enrollments.filter(e => e.status === 'CONFIRMED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <PendingIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {enrollments.filter(e => e.status === 'PENDING').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <CompletedIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {enrollments.filter(e => e.status === 'COMPLETED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enrollments Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Taller</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Instructor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Pago</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Progreso</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                      <SchoolIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {enrollment.workshopTitle}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{enrollment.instructor}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarIcon sx={{ mr: 1, fontSize: 16 }} />
                    {new Date(enrollment.date).toLocaleDateString('es-ES')}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(enrollment.status)}
                    label={enrollment.status}
                    color={getStatusColor(enrollment.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={enrollment.paymentStatus}
                    color={enrollment.paymentStatus === 'PAID' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 60, mr: 1 }}>
                      <Box sx={{ backgroundColor: 'grey.200', height: 8, borderRadius: 1 }}>
                        <Box
                          sx={{
                            backgroundColor: enrollment.progress === 100 ? 'success.main' : 'primary.main',
                            height: '100%',
                            width: `${enrollment.progress}%`,
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                      {enrollment.progress}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mr: 1 }}
                    disabled={enrollment.status === 'COMPLETED'}
                  >
                    Ver
                  </Button>
                  {enrollment.paymentStatus === 'PENDING' && (
                    <Button variant="contained" size="small" color="warning">
                      Pagar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {enrollments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SchoolIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No tienes inscripciones aún.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Explora nuestros talleres y comienza tu aprendizaje hoy.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default MyEnrollments