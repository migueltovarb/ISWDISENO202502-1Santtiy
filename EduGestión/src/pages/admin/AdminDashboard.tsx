import React from 'react';
import {
  Box,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Payment as PaymentIcon,
  CardMembership as CertificateIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Usuarios',
      value: '1,247',
      change: '+12%',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary',
    },
    {
      title: 'Talleres Activos',
      value: '45',
      change: '+8%',
      icon: <SchoolIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success',
    },
    {
      title: 'Ingresos Mensuales',
      value: '$24,500',
      change: '+15%',
      icon: <PaymentIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: 'warning',
    },
    {
      title: 'Certificados Emitidos',
      value: '892',
      change: '+23%',
      icon: <CertificateIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info',
    },
  ];

  const recentUsers = [
    { id: 1, name: 'María González', email: 'maria@example.com', role: 'Estudiante', status: 'active' },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos@example.com', role: 'Instructor', status: 'active' },
    { id: 3, name: 'Ana Martínez', email: 'ana@example.com', role: 'Estudiante', status: 'pending' },
    { id: 4, name: 'Luis Fernández', email: 'luis@example.com', role: 'Estudiante', status: 'active' },
    { id: 5, name: 'Sofía López', email: 'sofia@example.com', role: 'Instructor', status: 'active' },
  ];

  const recentWorkshops = [
    { id: 1, title: 'Desarrollo Web con React', instructor: 'Juan Pérez', students: 25, status: 'active' },
    { id: 2, title: 'Diseño UX/UI', instructor: 'María García', students: 18, status: 'active' },
    { id: 3, title: 'Marketing Digital', instructor: 'Carlos Sánchez', students: 32, status: 'draft' },
    { id: 4, title: 'Python para Principiantes', instructor: 'Laura Torres', students: 15, status: 'active' },
  ];

  const pendingPayments = [
    { id: 1, student: 'Roberto Díaz', workshop: 'Desarrollo Web con React', amount: '$150', date: '2024-01-15' },
    { id: 2, student: 'Patricia Ruiz', workshop: 'Diseño UX/UI', amount: '$120', date: '2024-01-14' },
    { id: 3, student: 'Jorge Morales', workshop: 'Marketing Digital', amount: '$200', date: '2024-01-13' },
  ];

  const quickActions = [
    { title: 'Crear Usuario', action: () => navigate('/admin/users'), color: 'primary' },
    { title: 'Nuevo Taller', action: () => navigate('/admin/workshops'), color: 'success' },
    { title: 'Ver Pagos', action: () => navigate('/admin/payments'), color: 'warning' },
    { title: 'Emitir Certificado', action: () => navigate('/admin/certificates'), color: 'info' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Panel de Administración
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Button
              variant="contained"
              fullWidth
              onClick={action.action}
              sx={{
                height: 60,
                background: `linear-gradient(135deg, ${
                  action.color === 'primary' ? '#1E40AF' :
                  action.color === 'success' ? '#10B981' :
                  action.color === 'warning' ? '#F59E0B' :
                  '#3B82F6'
                } 0%, ${
                  action.color === 'primary' ? '#3B82F6' :
                  action.color === 'success' ? '#34D399' :
                  action.color === 'warning' ? '#FCD34D' :
                  '#60A5FA'
                } 100%)`,
                color: 'white',
                fontWeight: 'bold',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
              }}
            >
              {action.title}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                    <Typography variant="body2" color="success.main" sx={{ fontWeight: 'bold' }}>
                      {stat.change}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity and Pending Tasks */}
      <Grid container spacing={3}>
        {/* Recent Users */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Usuarios Recientes
                </Typography>
                <IconButton size="small" onClick={() => navigate('/admin/users')}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <List dense>
                {recentUsers.map((user) => (
                  <ListItem key={user.id} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {user.name[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={user.role}
                              size="small"
                              sx={{ fontSize: '0.7rem' }}
                            />
                            <Chip
                              label={user.status === 'active' ? 'Activo' : 'Pendiente'}
                              size="small"
                              color={user.status === 'active' ? 'success' : 'warning'}
                              sx={{ fontSize: '0.7rem' }}
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Workshops */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Talleres Recientes
                </Typography>
                <IconButton size="small" onClick={() => navigate('/admin/workshops')}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <List dense>
                {recentWorkshops.map((workshop) => (
                  <ListItem key={workshop.id} divider>
                    <ListItemText
                      primary={workshop.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Instructor: {workshop.instructor}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Estudiantes: {workshop.students}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={workshop.status === 'active' ? 'Activo' : 'Borrador'}
                              size="small"
                              color={workshop.status === 'active' ? 'success' : 'default'}
                              sx={{ fontSize: '0.7rem' }}
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Payments */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Pagos Pendientes
                </Typography>
                <IconButton size="small" onClick={() => navigate('/admin/payments')}>
                  <MoreVertIcon />
                </IconButton>
              </Box>
              <List dense>
                {pendingPayments.map((payment) => (
                  <ListItem key={payment.id} divider>
                    <ListItemText
                      primary={`${payment.student} - $${payment.amount}`}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {payment.workshop}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {payment.date}
                          </Typography>
                        </Box>
                      }
                    />
                    <WarningIcon color="warning" sx={{ fontSize: 20 }} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;