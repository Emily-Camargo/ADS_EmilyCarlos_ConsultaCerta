import Dialog from '../../../../components/dialog'
import { 
  Typography, 
  Chip, 
  Divider, 
  Box,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { 
  Person, 
  MedicalServices, 
  Badge, 
  Schedule, 
  AccessTime, 
  Restaurant, 
  CalendarToday,
  CheckCircle,
  Cancel
} from '@mui/icons-material'
import { HorarioAtendimento } from '../../utils/interfaces'
import { getNomeDiaSemana, formatarHorario, formatarData } from '../../utils/constants'

interface DetalhesMedicoProps {
  modal: boolean
  setModal: (open: boolean) => void
  horario: HorarioAtendimento | null
}

export function DetalhesMedico({
  modal,
  setModal,
  horario,
}: Readonly<DetalhesMedicoProps>) {
  
  const fechar = () => {
    setModal(false)
  }

  const getStatusColor = (ativo: boolean) => {
    return ativo ? 'success' : 'default'
  }

  const getStatusText = (ativo: boolean) => {
    return ativo ? 'Ativo' : 'Inativo'
  }

  return (
    <Dialog
      maxWidth="sm"
      title={`Detalhes - ${horario?.nome_medico || 'Médico'}`}
      open={modal}
      onClose={fechar}
    >
      {!horario ? (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          py={8}
          gap={2}
        >
          <Cancel sx={{ fontSize: 48, color: '#bdbdbd', mb: 1 }} />
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Nenhum horário selecionado
          </Typography>
        </Box>
      ) : (
        <Box sx={{ p: 0 }}>
          {/* Header com informações do médico */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              mb: 2, 
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: 2,
              border: '1px solid #e0e0e0'
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar 
                sx={{ 
                  width: 40, 
                  height: 40, 
                  bgcolor: 'primary.main'
                }}
              >
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  {horario.nome_medico}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
                  <Chip
                    icon={<MedicalServices sx={{ fontSize: '0.8rem' }} />}
                    label={horario.especialidade || 'Especialidade não informada'}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500, fontSize: '0.7rem' }}
                  />
                  {horario.crm && (
                    <Chip
                      icon={<Badge sx={{ fontSize: '0.8rem' }} />}
                      label={`CRM: ${horario.crm}`}
                      color="secondary"
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 500, fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Seção de horários */}
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Schedule color="primary" sx={{ fontSize: '1.2rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50', fontSize: '1.1rem' }}>
                Horário de Atendimento
              </Typography>
            </Box>
            
            <Paper 
              elevation={2} 
              sx={{ 
                p: 3,
                borderRadius: 2,
                border: '1px solid #e0e0e0'
              }}
            >
              {/* Header do horário */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                  {getNomeDiaSemana(horario.dia_semana)}
                </Typography>
                <Chip
                  icon={horario.ativo ? <CheckCircle sx={{ fontSize: '0.9rem' }} /> : <Cancel sx={{ fontSize: '0.9rem' }} />}
                  label={getStatusText(horario.ativo)}
                  color={getStatusColor(horario.ativo)}
                  size="small"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Lista de informações */}
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <AccessTime color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Horário de Funcionamento"
                    secondary={`${formatarHorario(horario.hora_inicio)} - ${formatarHorario(horario.hora_fim)}`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Schedule color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Intervalo entre Consultas"
                    secondary={`${horario.intervalo_minutos} minutos`}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>

                {horario.almoco_inicio && horario.almoco_fim && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Restaurant color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Horário de Almoço"
                      secondary={`${formatarHorario(horario.almoco_inicio)} - ${formatarHorario(horario.almoco_fim)}`}
                      primaryTypographyProps={{ fontWeight: 500 }}
                      secondaryTypographyProps={{ fontWeight: 600 }}
                    />
                  </ListItem>
                )}

                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Período de Vigência"
                    secondary={
                      horario.data_vigencia_inicio && horario.data_vigencia_fim
                        ? `${formatarData(horario.data_vigencia_inicio)} - ${formatarData(horario.data_vigencia_fim)}`
                        : 'Indefinida'
                    }
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ fontWeight: 600 }}
                  />
                </ListItem>
              </List>
            </Paper>
          </Box>
        </Box>
      )}
    </Dialog>
  )
}
