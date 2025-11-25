import React, { useState } from 'react'
import {
  Box,
  Typography,
  GridLegacy as Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon } from '@mui/icons-material'

const WorkshopCatalog: React.FC = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [priceFilter, setPriceFilter] = useState('')

  // Mock data - replace with actual API calls
  const workshops = [
    {
      id: '1',
      title: 'Desarrollo Web con React',
      description: 'Aprende a construir aplicaciones web modernas con React, incluyendo hooks, estado y routing.',
      instructor: 'Juan Pérez',
      category: 'Tecnología',
      date: '2024-12-15',
      duration: '8 horas',
      price: 150,
      capacity: 20,
      enrolled: 15,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=React%20web%20development%20workshop%20banner%20with%20modern%20design&image_size=landscape_16_9',
    },
    {
      id: '2',
      title: 'Diseño UX/UI',
      description: 'Domina los principios del diseño de experiencia de usuario e interfaces modernas.',
      instructor: 'María García',
      category: 'Diseño',
      date: '2024-12-20',
      duration: '6 horas',
      price: 120,
      capacity: 25,
      enrolled: 18,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=UX%20UI%20design%20workshop%20banner%20with%20creative%20layout&image_size=landscape_16_9',
    },
    {
      id: '3',
      title: 'Marketing Digital',
      description: 'Estrategias efectivas de marketing digital para emprendedores y pequeñas empresas.',
      instructor: 'Carlos Rodríguez',
      category: 'Marketing',
      date: '2024-12-18',
      duration: '10 horas',
      price: 200,
      capacity: 30,
      enrolled: 22,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Digital%20marketing%20workshop%20banner%20with%20business%20theme&image_size=landscape_16_9',
    },
    {
      id: '4',
      title: 'Fotografía Profesional',
      description: 'Técnicas avanzadas de fotografía, composición y edición de imágenes.',
      instructor: 'Ana Martínez',
      category: 'Fotografía',
      date: '2024-12-22',
      duration: '12 horas',
      price: 180,
      capacity: 15,
      enrolled: 8,
      image: 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20photography%20workshop%20banner%20with%20camera%20and%20lenses&image_size=landscape_16_9',
    },
  ]

  const categories = ['Todas', 'Tecnología', 'Diseño', 'Marketing', 'Fotografía']
  const priceRanges = ['Todos', 'Menos de $100', '$100 - $200', 'Más de $200']

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === '' || categoryFilter === 'Todas' || workshop.category === categoryFilter
    
    const matchesPrice = priceFilter === '' || priceFilter === 'Todos' || 
      (priceFilter === 'Menos de $100' && workshop.price < 100) ||
      (priceFilter === '$100 - $200' && workshop.price >= 100 && workshop.price <= 200) ||
      (priceFilter === 'Más de $200' && workshop.price > 200)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Catálogo de Talleres 📚
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar talleres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ backgroundColor: 'background.paper' }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Categoría"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category === 'Todas' ? '' : category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Rango de Precio</InputLabel>
              <Select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                label="Rango de Precio"
              >
                {priceRanges.map((range) => (
                  <MenuItem key={range} value={range === 'Todos' ? '' : range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Results Count */}
      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
        {filteredWorkshops.length} talleres encontrados
      </Typography>

      {/* Workshop Grid */}
      <Grid container spacing={3}>
        {filteredWorkshops.map((workshop) => (
          <Grid item xs={12} md={6} lg={4} key={workshop.id}>
            <Card sx={{ maxWidth: 400, boxShadow: 3, borderRadius: 3, height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={workshop.image}
                alt={workshop.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', flex: 1 }}>
                    {workshop.title}
                  </Typography>
                  <Chip
                    label={workshop.category}
                    size="small"
                    sx={{ bgcolor: 'primary.light', color: 'white', ml: 1 }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                  {workshop.description}
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    👨‍🏫 {workshop.instructor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    📅 {new Date(workshop.date).toLocaleDateString('es-ES')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    ⏱️ {workshop.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    👥 {workshop.enrolled}/{workshop.capacity} inscritos
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    ${workshop.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate(`/student/workshops/${workshop.id}`)}
                    sx={{ borderRadius: 2 }}
                    disabled={workshop.enrolled >= workshop.capacity}
                  >
                    {workshop.enrolled >= workshop.capacity ? 'Cupos Llenos' : 'Ver Detalles'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredWorkshops.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron talleres que coincidan con tu búsqueda.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Intenta ajustar tus filtros o buscar con diferentes términos.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default WorkshopCatalog