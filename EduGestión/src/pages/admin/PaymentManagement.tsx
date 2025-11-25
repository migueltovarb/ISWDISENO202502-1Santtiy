import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  GridLegacy as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Avatar,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

interface Payment {
  id: number;
  estudiante: string;
  email: string;
  taller: string;
  monto: number;
  fechaPago: string;
  metodoPago: 'tarjeta' | 'transferencia' | 'paypal';
  estado: 'pendiente' | 'completado' | 'rechazado' | 'reembolsado';
  referencia: string;
}

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      estudiante: 'Juan Pérez',
      email: 'juan@example.com',
      taller: 'Desarrollo Web con React',
      monto: 150,
      fechaPago: '2024-01-15',
      metodoPago: 'tarjeta',
      estado: 'completado',
      referencia: 'PAY-001-2024',
    },
    {
      id: 2,
      estudiante: 'María García',
      email: 'maria@example.com',
      taller: 'Diseño UX/UI',
      monto: 120,
      fechaPago: '2024-01-14',
      metodoPago: 'transferencia',
      estado: 'pendiente',
      referencia: 'PAY-002-2024',
    },
    {
      id: 3,
      estudiante: 'Carlos López',
      email: 'carlos@example.com',
      taller: 'Marketing Digital',
      monto: 200,
      fechaPago: '2024-01-13',
      metodoPago: 'paypal',
      estado: 'rechazado',
      referencia: 'PAY-003-2024',
    },
    {
      id: 4,
      estudiante: 'Ana Martínez',
      email: 'ana@example.com',
      taller: 'Python para Principiantes',
      monto: 100,
      fechaPago: '2024-01-12',
      metodoPago: 'tarjeta',
      estado: 'completado',
      referencia: 'PAY-004-2024',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [methodFilter, setMethodFilter] = useState<string>('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.taller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.referencia.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || payment.estado === statusFilter;
    const matchesMethod = !methodFilter || payment.metodoPago === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleStatusChange = (paymentId: number, newStatus: 'completado' | 'rechazado' | 'reembolsado') => {
    setPayments(payments.map(payment => 
      payment.id === paymentId 
        ? { ...payment, estado: newStatus }
        : payment
    ));
    setSnackbar({ open: true, message: 'Estado del pago actualizado', severity: 'success' });
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'completado': return 'success';
      case 'pendiente': return 'warning';
      case 'rechazado': return 'error';
      case 'reembolsado': return 'info';
      default: return 'default';
    }
  };

  const getMethodIcon = (metodo: string) => {
    switch (metodo) {
      case 'tarjeta': return '💳';
      case 'transferencia': return '🏦';
      case 'paypal': return '💰';
      default: return '💳';
    }
  };

  const totalRevenue = payments
    .filter(p => p.estado === 'completado')
    .reduce((sum, p) => sum + p.monto, 0);

  const pendingPayments = payments.filter(p => p.estado === 'pendiente').length;
  const completedPayments = payments.filter(p => p.estado === 'completado').length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Gestión de Pagos
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Ingresos Totales
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                ${totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Pagos Completados
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {completedPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" color="primary.main" gutterBottom>
                Pagos Pendientes
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Buscar pagos..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ minWidth: 250 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Estado"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="completado">Completado</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="rechazado">Rechazado</MenuItem>
            <MenuItem value="reembolsado">Reembolsado</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Método</InputLabel>
          <Select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            label="Método"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="tarjeta">Tarjeta</MenuItem>
            <MenuItem value="transferencia">Transferencia</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Payments Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estudiante</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Taller</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Monto</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Método</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Referencia</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {payment.estudiante[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {payment.estudiante}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {payment.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {payment.taller}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    ${payment.monto}
                  </Typography>
                </TableCell>
                <TableCell>{payment.fechaPago}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <span>{getMethodIcon(payment.metodoPago)}</span>
                    <Typography variant="body2">
                      {payment.metodoPago === 'tarjeta' ? 'Tarjeta' :
                       payment.metodoPago === 'transferencia' ? 'Transferencia' : 'PayPal'}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      payment.estado === 'completado' ? 'Completado' :
                      payment.estado === 'pendiente' ? 'Pendiente' :
                      payment.estado === 'rechazado' ? 'Rechazado' : 'Reembolsado'
                    }
                    color={getStatusColor(payment.estado) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {payment.referencia}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {payment.estado === 'pendiente' && (
                      <>
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleStatusChange(payment.id, 'completado')}
                          title="Marcar como completado"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleStatusChange(payment.id, 'rechazado')}
                          title="Marcar como rechazado"
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    )}
                    {payment.estado === 'completado' && (
                      <IconButton
                        size="small"
                        color="warning"
                        onClick={() => handleStatusChange(payment.id, 'reembolsado')}
                        title="Procesar reembolso"
                      >
                        <PaymentIcon />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PaymentManagement;