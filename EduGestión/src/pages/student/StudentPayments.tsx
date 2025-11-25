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
  Payment as PaymentIcon,
  CheckCircle as PaidIcon,
  Schedule as PendingIcon,
  Cancel as FailedIcon,
  Receipt as ReceiptIcon,
} from '@mui/icons-material'

const StudentPayments: React.FC = () => {
  // Mock data - replace with actual API calls
  const payments = [
    {
      id: '1',
      workshopTitle: 'Desarrollo Web con React',
      amount: 150,
      date: '2024-12-01',
      status: 'PAID',
      method: 'Tarjeta de Crédito',
      transactionId: 'TXN-001-2024',
    },
    {
      id: '2',
      workshopTitle: 'Diseño UX/UI',
      amount: 120,
      date: '2024-12-05',
      status: 'PENDING',
      method: 'Transferencia Bancaria',
      transactionId: 'TXN-002-2024',
    },
    {
      id: '3',
      workshopTitle: 'Marketing Digital',
      amount: 200,
      date: '2024-11-15',
      status: 'PAID',
      method: 'PayPal',
      transactionId: 'TXN-003-2024',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'success'
      case 'PENDING':
        return 'warning'
      case 'FAILED':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PAID':
        return <PaidIcon />
      case 'PENDING':
        return <PendingIcon />
      case 'FAILED':
        return <FailedIcon />
      default:
        return <PendingIcon />
    }
  }

  const totalPaid = payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.amount, 0)

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Mis Pagos 💳
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <PaidIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                ${totalPaid}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Pagado
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <PendingIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                ${totalPending}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pagos Pendientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <PaymentIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {payments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Transacciones
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payments Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Taller</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Monto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Método</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ID Transacción</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {payment.workshopTitle}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    ${payment.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  {new Date(payment.date).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(payment.status)}
                    label={payment.status}
                    color={getStatusColor(payment.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {payment.transactionId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ReceiptIcon />}
                    disabled={payment.status !== 'PAID'}
                  >
                    Recibo
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {payments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <PaymentIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No tienes pagos registrados.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Los pagos aparecerán aquí una vez que realices una inscripción.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default StudentPayments