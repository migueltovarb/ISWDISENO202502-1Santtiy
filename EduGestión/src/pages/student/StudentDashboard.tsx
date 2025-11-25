import React from 'react'
import {
  Box,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Avatar,
} from '@mui/material'
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Payment as PaymentIcon,
  EmojiEvents as CertificateIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate()

  // Mock data - replace with actual API calls
  const stats = [
    { title: 'Talleres Inscritos', value: '3', icon: <SchoolIcon />, color: 'primary' },
    { title: 'Talleres Completados', value: '2', icon: <AssignmentIcon />, color: 'success' },
    { title: 'Pagos Realizados', value: '5', icon: <PaymentIcon />, color: 'info' },
    { title: 'Certificados', value: '2', icon: <CertificateIcon />, color: 'warning' },
  ]

  const recentWorkshops = [
    {
      id: '1',
      title: 'Desarrollo Web con React',
      instructor: 'Juan Pérez',
      date: '2024-12-15',
      category: 'Tecnología',
      price: 150,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=React%20web%20development%20workshop%20banner%20with%20modern%20design&image_size=landscape_16_9',
    },
    {
      id: '2',
      title: 'Diseño UX/UI',
      instructor: 'María García',
      date: '2024-12-20',
      category: 'Diseño',
      price: 120,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=UX%20UI%20design%20workshop%20banner%20with%20creative%20layout&image_size=landscape_16_9',
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Bienvenido de vuelta, Estudiante 👋
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                background: `linear-gradient(135deg, ${stat.color === 'primary' ? '#1E40AF' : 
                  stat.color === 'success' ? '#10B981' : 
                  stat.color === 'info' ? '#3B82F6' : '#F59E0B'} 0%, 
                  ${stat.color === 'primary' ? '#3B82F6' : 
                    stat.color === 'success' ? '#34D399' : 
                    stat.color === 'info' ? '#60A5FA' : '#FBBF24'} 100%)`,
                color: 'white',
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                  {React.cloneElement(stat.icon, { sx: { color: 'white' } })}
                </Avatar>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Workshops */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Talleres Recomendados 📚
      </Typography>
      <Grid container spacing={3}>
        {recentWorkshops.map((workshop) => (
          <Grid item xs={12} md={6} key={workshop.id}>
            <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={workshop.image}
                alt={workshop.title}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {workshop.title}
                  </Typography>
                  <Chip
                    label={workshop.category}
                    size="small"
                    sx={{ bgcolor: 'primary.light', color: 'white' }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  👨‍🏫 {workshop.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  📅 {new Date(workshop.date).toLocaleDateString('es-ES')}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    ${workshop.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/student/workshops/${workshop.id}`)}
                    sx={{ borderRadius: 2 }}
                  >
                    Ver Detalles
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/student/workshops')}
          sx={{ mr: 2, borderRadius: 3 }}
        >
          Explorar Más Talleres
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/student/enrollments')}
          sx={{ borderRadius: 3 }}
        >
          Ver Mis Inscripciones
        </Button>
      </Box>
    </Box>
  )
}

export default StudentDashboard