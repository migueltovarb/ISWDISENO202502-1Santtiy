import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
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
  CardMembership as CertificateIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

interface Certificate {
  id: number;
  estudiante: string;
  email: string;
  taller: string;
  instructor: string;
  fechaEmision: string;
  fechaVencimiento: string;
  codigoCertificado: string;
  estado: 'emitido' | 'pendiente' | 'vencido';
  nota?: number;
  nivel: 'aprobado' | 'excelente' | 'participacion';
}

const CertificateManagement: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      estudiante: 'Juan Pérez',
      email: 'juan@example.com',
      taller: 'Desarrollo Web con React',
      instructor: 'Carlos Rodríguez',
      fechaEmision: '2024-01-20',
      fechaVencimiento: '2025-01-20',
      codigoCertificado: 'CERT-2024-001',
      estado: 'emitido',
      nota: 92,
      nivel: 'excelente',
    },
    {
      id: 2,
      estudiante: 'María García',
      email: 'maria@example.com',
      taller: 'Diseño UX/UI',
      instructor: 'Laura Torres',
      fechaEmision: '2024-01-18',
      fechaVencimiento: '2025-01-18',
      codigoCertificado: 'CERT-2024-002',
      estado: 'emitido',
      nota: 85,
      nivel: 'aprobado',
    },
    {
      id: 3,
      estudiante: 'Carlos López',
      email: 'carlos@example.com',
      taller: 'Marketing Digital',
      instructor: 'Sofía Mendoza',
      fechaEmision: '',
      fechaVencimiento: '',
      codigoCertificado: '',
      estado: 'pendiente',
      nivel: 'participacion',
    },
    {
      id: 4,
      estudiante: 'Ana Martínez',
      email: 'ana@example.com',
      taller: 'Python para Principiantes',
      instructor: 'Roberto Díaz',
      fechaEmision: '2023-12-15',
      fechaVencimiento: '2024-12-15',
      codigoCertificado: 'CERT-2023-045',
      estado: 'vencido',
      nota: 78,
      nivel: 'aprobado',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCertificates = certificates.filter(certificate => {
    const matchesSearch = certificate.estudiante.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.taller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         certificate.codigoCertificado.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || certificate.estado === statusFilter;
    const matchesLevel = !levelFilter || certificate.nivel === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const handleIssueCertificate = (certificate: Certificate) => {
    const updatedCertificate = {
      ...certificate,
      estado: 'emitido' as const,
      fechaEmision: new Date().toISOString().split('T')[0],
      fechaVencimiento: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      codigoCertificado: `CERT-${new Date().getFullYear()}-${String(certificates.length + 1).padStart(3, '0')}`,
    };
    
    setCertificates(certificates.map(cert => 
      cert.id === certificate.id ? updatedCertificate : cert
    ));
    
    setSnackbar({ open: true, message: 'Certificado emitido exitosamente', severity: 'success' });
  };

  const handleDownloadCertificate = (_certificate: Certificate) => {
    setSnackbar({ open: true, message: 'Descargando certificado...', severity: 'success' });
    // Simulate download
    setTimeout(() => {
      setSnackbar({ open: true, message: 'Certificado descargado exitosamente', severity: 'success' });
    }, 2000);
  };

  const handleSendCertificate = (_certificate: Certificate) => {
    setSnackbar({ open: true, message: 'Enviando certificado por email...', severity: 'success' });
    // Simulate email sending
    setTimeout(() => {
      setSnackbar({ open: true, message: 'Certificado enviado exitosamente', severity: 'success' });
    }, 2000);
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'emitido': return 'success';
      case 'pendiente': return 'warning';
      case 'vencido': return 'error';
      default: return 'default';
    }
  };

  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case 'excelente': return 'success';
      case 'aprobado': return 'primary';
      case 'participacion': return 'info';
      default: return 'default';
    }
  };

  const getLevelLabel = (nivel: string) => {
    switch (nivel) {
      case 'excelente': return 'Excelente';
      case 'aprobado': return 'Aprobado';
      case 'participacion': return 'Participación';
      default: return nivel;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Gestión de Certificados
      </Typography>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CertificateIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h6" color="primary.main" gutterBottom>
                Emitidos
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {certificates.filter(c => c.estado === 'emitido').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CertificateIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h6" color="primary.main" gutterBottom>
                Pendientes
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'warning.main' }}>
                {certificates.filter(c => c.estado === 'pendiente').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CertificateIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h6" color="primary.main" gutterBottom>
                Vencidos
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {certificates.filter(c => c.estado === 'vencido').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <CertificateIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
              <Typography variant="h6" color="primary.main" gutterBottom>
                Total
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'info.main' }}>
                {certificates.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Buscar certificados..."
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
            <MenuItem value="emitido">Emitido</MenuItem>
            <MenuItem value="pendiente">Pendiente</MenuItem>
            <MenuItem value="vencido">Vencido</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Nivel</InputLabel>
          <Select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            label="Nivel"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="excelente">Excelente</MenuItem>
            <MenuItem value="aprobado">Aprobado</MenuItem>
            <MenuItem value="participacion">Participación</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Certificates Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estudiante</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Taller</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Instructor</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nivel</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Código</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Emisión</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCertificates.map((certificate) => (
              <TableRow key={certificate.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {certificate.estudiante[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {certificate.estudiante}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {certificate.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {certificate.taller}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {certificate.instructor}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getLevelLabel(certificate.nivel)}
                    color={getLevelColor(certificate.nivel) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      certificate.estado === 'emitido' ? 'Emitido' :
                      certificate.estado === 'pendiente' ? 'Pendiente' : 'Vencido'
                    }
                    color={getStatusColor(certificate.estado) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {certificate.codigoCertificado || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {certificate.fechaEmision || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {certificate.estado === 'pendiente' ? (
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<CertificateIcon />}
                        onClick={() => handleIssueCertificate(certificate)}
                      >
                        Emitir
                      </Button>
                    ) : (
                      <>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleDownloadCertificate(certificate)}
                          title="Descargar certificado"
                        >
                          <DownloadIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => handleSendCertificate(certificate)}
                          title="Enviar por email"
                        >
                          <EmailIcon />
                        </IconButton>
                      </>
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

export default CertificateManagement;