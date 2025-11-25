import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  GridLegacy as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

interface Workshop {
  id: number;
  titulo: string;
  descripcion: string;
  instructor: string;
  categoria: string;
  precio: number;
  duracion: string;
  nivel: 'principiante' | 'intermedio' | 'avanzado';
  estado: 'borrador' | 'activo' | 'finalizado';
  estudiantesInscritos: number;
  capacidadMaxima: number;
  fechaInicio: string;
  fechaFin: string;
  imagen: string;
}

const WorkshopManagement: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([
    {
      id: 1,
      titulo: 'Desarrollo Web con React',
      descripcion: 'Aprende a crear aplicaciones web modernas con React, TypeScript y Material-UI',
      instructor: 'Juan Pérez',
      categoria: 'Tecnología',
      precio: 150,
      duracion: '8 semanas',
      nivel: 'intermedio',
      estado: 'activo',
      estudiantesInscritos: 25,
      capacidadMaxima: 30,
      fechaInicio: '2024-02-01',
      fechaFin: '2024-03-25',
      imagen: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20web%20development%20workshop%20with%20react%20logo%20and%20code%20screens&image_size=landscape_4_3',
    },
    {
      id: 2,
      titulo: 'Diseño UX/UI',
      descripcion: 'Principios fundamentales de diseño de experiencia de usuario e interfaz',
      instructor: 'María García',
      categoria: 'Diseño',
      precio: 120,
      duracion: '6 semanas',
      nivel: 'principiante',
      estado: 'activo',
      estudiantesInscritos: 18,
      capacidadMaxima: 25,
      fechaInicio: '2024-02-15',
      fechaFin: '2024-03-28',
      imagen: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=ux%20ui%20design%20workshop%20with%20wireframes%20color%20palettes%20and%20design%20tools&image_size=landscape_4_3',
    },
    {
      id: 3,
      titulo: 'Marketing Digital',
      descripcion: 'Estrategias efectivas de marketing digital para emprendedores',
      instructor: 'Carlos Sánchez',
      categoria: 'Marketing',
      precio: 200,
      duracion: '10 semanas',
      nivel: 'intermedio',
      estado: 'borrador',
      estudiantesInscritos: 0,
      capacidadMaxima: 40,
      fechaInicio: '2024-03-01',
      fechaFin: '2024-05-10',
      imagen: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20marketing%20workshop%20with%20social%20media%20icons%20charts%20and%20laptops&image_size=landscape_4_3',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    instructor: '',
    categoria: '',
    precio: '',
    duracion: '',
    nivel: 'principiante' as 'principiante' | 'intermedio' | 'avanzado',
    capacidadMaxima: '',
    fechaInicio: '',
    fechaFin: '',
  });

  const categories = ['Tecnología', 'Diseño', 'Marketing', 'Negocios', 'Arte', 'Idiomas'];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || workshop.categoria === categoryFilter;
    const matchesStatus = !statusFilter || workshop.estado === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenDialog = (workshop?: Workshop) => {
    if (workshop) {
      setEditingWorkshop(workshop);
      setFormData({
        titulo: workshop.titulo,
        descripcion: workshop.descripcion,
        instructor: workshop.instructor,
        categoria: workshop.categoria,
        precio: workshop.precio.toString(),
        duracion: workshop.duracion,
        nivel: workshop.nivel,
        capacidadMaxima: workshop.capacidadMaxima.toString(),
        fechaInicio: workshop.fechaInicio,
        fechaFin: workshop.fechaFin,
      });
    } else {
      setEditingWorkshop(null);
      setFormData({
        titulo: '',
        descripcion: '',
        instructor: '',
        categoria: '',
        precio: '',
        duracion: '',
        nivel: 'principiante',
        capacidadMaxima: '',
        fechaInicio: '',
        fechaFin: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWorkshop(null);
  };

  const handleSubmit = () => {
    if (editingWorkshop) {
      setWorkshops(workshops.map(workshop => 
        workshop.id === editingWorkshop.id 
          ? { 
              ...workshop, 
              ...formData, 
              precio: parseFloat(formData.precio),
              capacidadMaxima: parseInt(formData.capacidadMaxima),
            }
          : workshop
      ));
      setSnackbar({ open: true, message: 'Taller actualizado exitosamente', severity: 'success' });
    } else {
      const newWorkshop: Workshop = {
        id: Math.max(...workshops.map(w => w.id)) + 1,
        ...formData,
        precio: parseFloat(formData.precio),
        capacidadMaxima: parseInt(formData.capacidadMaxima),
        estudiantesInscritos: 0,
        estado: 'borrador',
        imagen: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=educational%20workshop%20banner%20with%20books%20and%20learning%20materials&image_size=landscape_4_3',
      };
      setWorkshops([...workshops, newWorkshop]);
      setSnackbar({ open: true, message: 'Taller creado exitosamente', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (workshopId: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este taller?')) {
      setWorkshops(workshops.filter(workshop => workshop.id !== workshopId));
      setSnackbar({ open: true, message: 'Taller eliminado exitosamente', severity: 'success' });
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'success';
      case 'finalizado': return 'info';
      case 'borrador': return 'default';
      default: return 'default';
    }
  };

  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case 'principiante': return 'success';
      case 'intermedio': return 'warning';
      case 'avanzado': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Gestión de Talleres
      </Typography>

      {/* Filters and Actions */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Buscar talleres..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ minWidth: 250 }}
        />
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Categoría"
          >
            <MenuItem value="">Todas</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Estado"
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="borrador">Borrador</MenuItem>
            <MenuItem value="activo">Activo</MenuItem>
            <MenuItem value="finalizado">Finalizado</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ ml: 'auto' }}
        >
          Nuevo Taller
        </Button>
      </Box>

      {/* Workshops Grid */}
      <Grid container spacing={3}>
        {filteredWorkshops.map((workshop) => (
          <Grid item xs={12} md={6} lg={4} key={workshop.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={workshop.imagen}
                alt={workshop.titulo}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {workshop.titulo}
                  </Typography>
                  <Chip
                    label={workshop.estado}
                    color={getStatusColor(workshop.estado) as any}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  por {workshop.instructor}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {workshop.descripcion.length > 100 
                    ? `${workshop.descripcion.substring(0, 100)}...` 
                    : workshop.descripcion}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={workshop.categoria} size="small" variant="outlined" />
                  <Chip 
                    label={workshop.nivel} 
                    color={getLevelColor(workshop.nivel) as any}
                    size="small" 
                  />
                  <Chip label={`${workshop.duracion}`} size="small" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                    ${workshop.precio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {workshop.estudiantesInscritos}/{workshop.capacidadMaxima} estudiantes
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {workshop.fechaInicio} - {workshop.fechaFin}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(workshop)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(workshop.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Workshop Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingWorkshop ? 'Editar Taller' : 'Nuevo Taller'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                multiline
                rows={3}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  label="Categoría"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Precio"
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duración"
                value={formData.duracion}
                onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Nivel</InputLabel>
                <Select
                  value={formData.nivel}
                  onChange={(e) => setFormData({ ...formData, nivel: e.target.value as any })}
                  label="Nivel"
                >
                  <MenuItem value="principiante">Principiante</MenuItem>
                  <MenuItem value="intermedio">Intermedio</MenuItem>
                  <MenuItem value="avanzado">Avanzado</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Capacidad Máxima"
                type="number"
                value={formData.capacidadMaxima}
                onChange={(e) => setFormData({ ...formData, capacidadMaxima: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha Inicio"
                type="date"
                value={formData.fechaInicio}
                onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha Fin"
                type="date"
                value={formData.fechaFin}
                onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingWorkshop ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default WorkshopManagement;