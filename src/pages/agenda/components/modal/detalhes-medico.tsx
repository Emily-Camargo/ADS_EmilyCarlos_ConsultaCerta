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
  horariosMedico: HorarioAtendimento[]
  isLoading: boolean
  nomeMedico: string
}

export function DetalhesMedico({
  modal,
  setModal,
  horariosMedico,
  isLoading,
  nomeMedico,
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
      title={`Detalhes - ${nomeMedico}`}
      open={modal}
      onClose={fechar}
    >
      {isLoading ? (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          py={8}
          gap={2}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              border: '4px solid #e3f2fd',
              borderTop: '4px solid #1976d2',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }}
          />
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Carregando detalhes do médico...
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
                  {nomeMedico}
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap" mt={0.5}>
                  <Chip
                    icon={<MedicalServices sx={{ fontSize: '0.8rem' }} />}
                    label={horariosMedico[0]?.especialidade || 'Especialidade não informada'}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ fontWeight: 500, fontSize: '0.7rem' }}
                  />
                  {horariosMedico[0]?.crm && (
                    <Chip
                      icon={<Badge sx={{ fontSize: '0.8rem' }} />}
                      label={`CRM: ${horariosMedico[0].crm}`}
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
            
            {horariosMedico.length === 0 ? (
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  border: '2px dashed #e0e0e0',
                  borderRadius: 3
                }}
              >
                <Cancel sx={{ fontSize: 32, color: '#bdbdbd', mb: 1 }} />
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Nenhum horário cadastrado
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este médico ainda não possui horários de atendimento configurados.
                </Typography>
              </Paper>
            ) : (
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  borderRadius: 2,
                  border: '1px solid #e0e0e0'
                }}
              >
                {horariosMedico[0] && (
                  <>
                    {/* Header do horário */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                        {getNomeDiaSemana(horariosMedico[0].dia_semana)}
                      </Typography>
                      <Chip
                        icon={horariosMedico[0].ativo ? <CheckCircle sx={{ fontSize: '0.9rem' }} /> : <Cancel sx={{ fontSize: '0.9rem' }} />}
                        label={getStatusText(horariosMedico[0].ativo)}
                        color={getStatusColor(horariosMedico[0].ativo)}
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
                          secondary={`${formatarHorario(horariosMedico[0].hora_inicio)} - ${formatarHorario(horariosMedico[0].hora_fim)}`}
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
                          secondary={`${horariosMedico[0].intervalo_minutos} minutos`}
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondaryTypographyProps={{ fontWeight: 600 }}
                        />
                      </ListItem>

                      {horariosMedico[0].almoco_inicio && horariosMedico[0].almoco_fim && (
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            <Restaurant color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Horário de Almoço"
                            secondary={`${formatarHorario(horariosMedico[0].almoco_inicio)} - ${formatarHorario(horariosMedico[0].almoco_fim)}`}
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
                            horariosMedico[0].data_vigencia_inicio && horariosMedico[0].data_vigencia_fim
                              ? `${formatarData(horariosMedico[0].data_vigencia_inicio)} - ${formatarData(horariosMedico[0].data_vigencia_fim)}`
                              : 'Indefinida'
                          }
                          primaryTypographyProps={{ fontWeight: 500 }}
                          secondaryTypographyProps={{ fontWeight: 600 }}
                        />
                      </ListItem>
                    </List>
                  </>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      )}
    </Dialog>
  )
}
