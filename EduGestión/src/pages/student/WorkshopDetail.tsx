import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Avatar,
} from '@mui/material'
import {
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  School as SchoolIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material'

const WorkshopDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  // Mock data - replace with actual API call
  const workshop = {
    id: id || '1',
    title: 'Desarrollo Web con React',
    description: 'Aprende a construir aplicaciones web modernas con React, incluyendo hooks, estado y routing. Este taller te proporcionará las habilidades necesarias para crear aplicaciones interactivas y escalables.',
    instructor: 'Juan Pérez',
    instructorBio: 'Desarrollador web con más de 10 años de experiencia, especializado en React y aplicaciones modernas.',
    category: 'Tecnología',
    date: '2024-12-15',
    duration: '8 horas',
    price: 150,
    capacity: 20,
    enrolled: 15,
    location: 'Online vía Zoom',
    requirements: ['Conocimientos básicos de HTML/CSS', 'JavaScript intermedio', 'Computadora con internet'],
    image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=React%20web%20development%20workshop%20banner%20with%20modern%20design&image_size=landscape_16_9',
  }

  const handleEnroll = () => {
    // Navigate to payment or enrollment process
    console.log('Iniciando inscripción...')
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Detalle del Taller
      </Typography>

      <Grid container spacing={4}>
        {/* Workshop Image and Basic Info */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 3 }}>
            <CardMedia
              component="img"
              height="400"
              image={workshop.image}
              alt={workshop.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', flex: 1 }}>
                  {workshop.title}
                </Typography>
                <Chip
                  label={workshop.category}
                  sx={{ bgcolor: 'primary.main', color: 'white', ml: 2 }}
                />
              </Box>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                {workshop.description}
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Fecha:</strong> {new Date(workshop.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Duración:</strong> {workshop.duration}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Instructor:</strong> {workshop.instructor}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Ubicación:</strong> {workshop.location}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Precio:</strong> ${workshop.price}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Cupos:</strong> {workshop.enrolled}/{workshop.capacity}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Instructor Info */}
          <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Sobre el Instructor
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2, width: 56, height: 56 }}>
                  {workshop.instructor.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{workshop.instructor}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {workshop.instructorBio}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Requisitos del Taller
              </Typography>
              <List dense>
                {workshop.requirements.map((requirement, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemIcon>
                      <CheckIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={requirement} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Enrollment Card (Sticky) */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              position: 'sticky',
              top: 20,
              backgroundColor: 'background.paper',
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Inscríbete Ahora
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 1 }}>
                ${workshop.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Precio por persona
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                📅 {new Date(workshop.date).toLocaleDateString('es-ES')}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ⏱️ {workshop.duration}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                👥 {workshop.enrolled} de {workshop.capacity} cupos disponibles
              </Typography>
              <Typography variant="body2">
                📍 {workshop.location}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleEnroll}
              disabled={workshop.enrolled >= workshop.capacity}
              sx={{ mb: 2, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
            >
              {workshop.enrolled >= workshop.capacity ? 'Cupos Llenos' : 'Inscribirse Ahora'}
            </Button>

            {workshop.enrolled < workshop.capacity && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Garantía de devolución de 7 días
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WorkshopDetail