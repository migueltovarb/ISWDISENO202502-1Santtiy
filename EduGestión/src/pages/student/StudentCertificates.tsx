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
  EmojiEvents as CertificateIcon,
  Download as DownloadIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CompletedIcon,
} from '@mui/icons-material'

const StudentCertificates: React.FC = () => {
  // Mock data - replace with actual API calls
  const certificates = [
    {
      id: '1',
      workshopTitle: 'Desarrollo Web con React',
      instructor: 'Juan Pérez',
      issueDate: '2024-11-15',
      completionDate: '2024-11-10',
      status: 'ISSUED',
      certificateId: 'CERT-001-2024',
    },
    {
      id: '2',
      workshopTitle: 'Marketing Digital',
      instructor: 'Carlos Rodríguez',
      issueDate: '2024-10-20',
      completionDate: '2024-10-15',
      status: 'ISSUED',
      certificateId: 'CERT-002-2024',
    },
  ]

  const handleDownload = (certificateId: string) => {
    console.log('Descargando certificado:', certificateId)
    // Implement certificate download logic
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Mis Certificados 🏆
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'gold', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <CertificateIcon sx={{ color: 'white' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'gold' }}>
                {certificates.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Certificados Obtenidos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <CompletedIcon />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {certificates.filter(c => c.status === 'ISSUED').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Emitidos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 48, height: 48 }}>
                <CalendarIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                Último: {certificates.length > 0 ? new Date(certificates[0].issueDate).toLocaleDateString('es-ES') : 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha de Emisión
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Certificates Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Taller</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Instructor</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Completado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Emisión</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>ID Certificado</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((certificate) => (
              <TableRow key={certificate.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'gold', mr: 2, width: 40, height: 40 }}>
                      <CertificateIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {certificate.workshopTitle}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{certificate.instructor}</TableCell>
                <TableCell>
                  {new Date(certificate.completionDate).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell>
                  {new Date(certificate.issueDate).toLocaleDateString('es-ES')}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={<CompletedIcon />}
                    label={certificate.status}
                    color="success"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    {certificate.certificateId}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={() => handleDownload(certificate.certificateId)}
                    sx={{ borderRadius: 2 }}
                  >
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {certificates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CertificateIcon sx={{ fontSize: 64, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No tienes certificados aún.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Completa talleres para obtener certificados.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default StudentCertificates