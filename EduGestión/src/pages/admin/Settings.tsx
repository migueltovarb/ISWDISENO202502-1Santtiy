import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  GridLegacy as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar,
  Avatar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Payment as PaymentIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // General Settings
    platformName: 'EduGestión',
    platformDescription: 'Plataforma de gestión educativa para talleres y cursos',
    contactEmail: 'admin@edugestion.com',
    contactPhone: '+1-555-123-4567',
    platformLogo: '',
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: 'noreply@edugestion.com',
    smtpPassword: '',
    emailFrom: 'EduGestión <noreply@edugestion.com>',
    
    // Payment Settings
    stripePublicKey: 'pk_test_1234567890',
    stripeSecretKey: 'sk_test_1234567890',
    paypalClientId: 'paypal_client_id_here',
    paypalSecret: 'paypal_secret_here',
    currency: 'USD',
    
    // Security Settings
    requireEmailVerification: true,
    enableTwoFactorAuth: false,
    sessionTimeout: '30',
    passwordMinLength: '8',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    
    // Platform Settings
    allowPublicRegistration: true,
    enableCertificates: true,
    enableReviews: true,
    maxFileUploadSize: '10',
    supportedFileTypes: 'pdf,doc,docx,ppt,pptx,jpg,png,mp4',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [activeTab, setActiveTab] = useState('general');

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSnackbar({ open: true, message: 'Configuración guardada exitosamente', severity: 'success' });
  };

  const handleLogoUpload = () => {
    setSnackbar({ open: true, message: 'Función de carga de logo no implementada', severity: 'success' });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <BusinessIcon /> },
    { id: 'email', label: 'Email', icon: <EmailIcon /> },
    { id: 'payments', label: 'Pagos', icon: <PaymentIcon /> },
    { id: 'security', label: 'Seguridad', icon: <SecurityIcon /> },
    { id: 'notifications', label: 'Notificaciones', icon: <NotificationsIcon /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de la Plataforma"
                value={settings.platformName}
                onChange={(e) => handleInputChange('platformName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={settings.platformDescription}
                onChange={(e) => handleInputChange('platformDescription', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email de Contacto"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono de Contacto"
                value={settings.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                  {settings.platformName[0]}
                </Avatar>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={handleLogoUpload}
                >
                  Subir Logo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowPublicRegistration}
                    onChange={(e) => handleInputChange('allowPublicRegistration', e.target.checked)}
                  />
                }
                label="Permitir registro público"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableCertificates}
                    onChange={(e) => handleInputChange('enableCertificates', e.target.checked)}
                  />
                }
                label="Habilitar certificados"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableReviews}
                    onChange={(e) => handleInputChange('enableReviews', e.target.checked)}
                  />
                }
                label="Habilitar reseñas y calificaciones"
              />
            </Grid>
          </Grid>
        );

      case 'email':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Servidor SMTP"
                value={settings.smtpHost}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Puerto SMTP"
                type="number"
                value={settings.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Usuario SMTP"
                value={settings.smtpUsername}
                onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña SMTP"
                type="password"
                value={settings.smtpPassword}
                onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Remitente"
                value={settings.emailFrom}
                onChange={(e) => handleInputChange('emailFrom', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 'payments':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Stripe
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Clave Pública Stripe"
                value={settings.stripePublicKey}
                onChange={(e) => handleInputChange('stripePublicKey', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Clave Secreta Stripe"
                type="password"
                value={settings.stripeSecretKey}
                onChange={(e) => handleInputChange('stripeSecretKey', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                PayPal
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client ID PayPal"
                value={settings.paypalClientId}
                onChange={(e) => handleInputChange('paypalClientId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Secret PayPal"
                type="password"
                value={settings.paypalSecret}
                onChange={(e) => handleInputChange('paypalSecret', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Select
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  label="Moneda"
                >
                  <MenuItem value="USD">USD - Dólar Americano</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                  <MenuItem value="COP">COP - Peso Colombiano</MenuItem>
                  <MenuItem value="MXN">MXN - Peso Mexicano</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 'security':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
                  />
                }
                label="Requerir verificación de email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.enableTwoFactorAuth}
                    onChange={(e) => handleInputChange('enableTwoFactorAuth', e.target.checked)}
                  />
                }
                label="Habilitar autenticación de dos factores"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tiempo de Sesión (minutos)"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitud Mínima de Contraseña"
                type="number"
                value={settings.passwordMinLength}
                onChange={(e) => handleInputChange('passwordMinLength', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 'notifications':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                  />
                }
                label="Notificaciones por email"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                  />
                }
                label="Notificaciones por SMS"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                  />
                }
                label="Notificaciones push"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.weeklyReports}
                    onChange={(e) => handleInputChange('weeklyReports', e.target.checked)}
                  />
                }
                label="Reportes semanales"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tamaño Máximo de Archivos (MB)"
                type="number"
                value={settings.maxFileUploadSize}
                onChange={(e) => handleInputChange('maxFileUploadSize', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tipos de Archivos Permitidos"
                value={settings.supportedFileTypes}
                onChange={(e) => handleInputChange('supportedFileTypes', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Configuración
      </Typography>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'contained' : 'text'}
              startIcon={tab.icon}
              onClick={() => setActiveTab(tab.id)}
              sx={{ 
                minWidth: 120,
                justifyContent: 'flex-start',
                color: activeTab === tab.id ? 'white' : 'inherit',
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Tab Content */}
      <Card>
        <CardContent>
          {renderTabContent()}
        </CardContent>
      </Card>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Guardar Cambios
        </Button>
      </Box>

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

export default Settings;