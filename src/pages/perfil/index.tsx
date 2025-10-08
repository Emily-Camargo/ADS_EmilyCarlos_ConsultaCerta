import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getInfoUsuario } from '../../services/usuario';
import { InfoUsuarioRes } from '../../services/usuario/interface';
import CustomLoaders from '../../components/Loader';
import { Card, Avatar, Group, Text, Badge, Stack, Paper, Title, Divider, Grid, Button } from '@mantine/core';
import { MdPerson, MdEmail, MdPhone, MdCalendarToday, MdWhatsapp, MdVerifiedUser, MdEdit, MdLocalHospital, MdBloodtype, MdContactEmergency, MdAttachMoney, MdAccessTime, MdBusiness } from 'react-icons/md';
import { EditarPacientePerfil } from './components/modal/editar-paciente';
import { PacientePerfilForm } from './utils/interfaces';
import { toast } from 'react-toastify';

const MeuPerfil = () => {
  const { getIdUsuario } = useAuth();
  const [userData, setUserData] = useState<InfoUsuarioRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalEditarPaciente, setModalEditarPaciente] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const idUsuario = getIdUsuario();
      
      if (!idUsuario) {
        setError('Usuário não autenticado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getInfoUsuario({ id: idUsuario });
        setUserData(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Erro ao buscar dados do usuário:', err);
        setError('Não foi possível carregar os dados do perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [getIdUsuario]);

  if (loading) {
    return <CustomLoaders open />;
  }

  if (error || !userData) {
    return (
      <div className="p-6 max-sm:p-4">
        <Paper p="xl" radius="md" withBorder className="text-center">
          <Text c="red" size="lg">
            {error || 'Erro ao carregar perfil'}
          </Text>
        </Paper>
      </div>
    );
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (phone: string) => {
    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  };

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getPerfilNome = (idPerfil: number) => {
    switch (idPerfil) {
      case 2:
        return 'Secretária';
      case 3:
        return 'Médico';
      case 4:
        return 'Paciente';
      default:
        return 'Usuário';
    }
  };

  const getPerfilColor = (idPerfil: number) => {
    switch (idPerfil) {
      case 2:
        return 'blue';
      case 3:
        return 'green';
      case 4:
        return 'violet';
      default:
        return 'gray';
    }
  };

  const handleEditarPaciente = () => {
    setModalEditarPaciente(true);
  };

  const handleSalvarPaciente = async (dadosPaciente: PacientePerfilForm) => {
    try {
      // TODO: Implementar a chamada à API para atualizar os dados do paciente
      console.log('Dados do paciente para salvar:', dadosPaciente);
      
      // Atualizar localmente até implementar a API
      if (userData) {
        setUserData({
          ...userData,
          paciente: {
            idPaciente: userData.paciente?.idPaciente || 0,
            dataNascimento: dadosPaciente.dataNascimento,
            genero: dadosPaciente.genero,
            tipoSanguineo: dadosPaciente.tipoSanguineo,
            convenio: dadosPaciente.convenio,
            numeroCarteirinha: dadosPaciente.numeroCarteirinha,
            contatoEmergenciaNome: dadosPaciente.contatoEmergenciaNome,
            contatoEmergenciaTelefone: dadosPaciente.contatoEmergenciaTelefone,
            observacoes: dadosPaciente.observacoes,
          }
        });
      }
      
      toast.success('Informações atualizadas com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      toast.error('Erro ao atualizar informações');
    }
  };

  const getPacienteDataForEdit = (): PacientePerfilForm | null => {
    if (!userData?.paciente) return null;
    
    return {
      dataNascimento: userData.paciente.dataNascimento || '',
      genero: userData.paciente.genero || '',
      tipoSanguineo: userData.paciente.tipoSanguineo || '',
      convenio: userData.paciente.convenio || '',
      numeroCarteirinha: userData.paciente.numeroCarteirinha || '',
      contatoEmergenciaNome: userData.paciente.contatoEmergenciaNome || '',
      contatoEmergenciaTelefone: userData.paciente.contatoEmergenciaTelefone || '',
      observacoes: userData.paciente.observacoes || '',
    };
  };

  const formatDateBirth = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const InfoItem = ({ icon: Icon, label, value, iconColor = "text-blue-600" }: any) => (
    <div className="flex items-start gap-2 py-2">
      <Icon size={16} className={`${iconColor} mt-0.5 flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <Text size="xs" c="dimmed" fw={500} className="mb-0.5">{label}</Text>
        <Text size="sm" fw={600} className="break-words">{value}</Text>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <Card shadow="sm" p="md" radius="md" withBorder className="mb-3 bg-white">
          <Group align="center" gap="md">
            <Avatar
              size={70}
              radius="xl"
              color={getPerfilColor(userData.idPerfil)}
              className="border-2 border-gray-200"
            >
              <Text size="lg" fw={700}>
                {getInitials(userData.nome)}
              </Text>
            </Avatar>
            <div className="flex-1">
              <Title order={2} className="text-gray-800 mb-1">
                {userData.nome}
              </Title>
              <Group gap="xs">
                <Badge 
                  color={getPerfilColor(userData.idPerfil)} 
                  variant="light" 
                  size="sm"
                  leftSection={<MdVerifiedUser size={12} />}
                >
                  {getPerfilNome(userData.idPerfil)}
                </Badge>
                <Badge 
                  color={userData.ativo ? 'green' : 'red'} 
                  variant="dot" 
                  size="sm"
                >
                  {userData.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </Group>
            </div>
          </Group>
        </Card>

        {/* Main Content Grid */}
        <Grid gutter="sm">
          {/* Coluna Esquerda - Informações Pessoais */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" p="md" radius="md" withBorder className="h-full bg-white">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="sm" className="tracking-wider">
                Informações Pessoais
              </Text>
              <Divider mb="sm" />
              
              <Stack gap={4}>
                <InfoItem icon={MdPerson} label="CPF" value={formatCPF(userData.cpf)} />
                <InfoItem icon={MdEmail} label="E-mail" value={userData.email} />
                <InfoItem icon={MdPhone} label="Telefone" value={formatPhone(userData.telefone)} />
                <div className="flex items-start gap-2 py-2">
                  <MdWhatsapp size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Text size="xs" c="dimmed" fw={500} className="mb-0.5">WhatsApp</Text>
                    <Group gap={4}>
                      <Text size="sm" fw={600}>{formatPhone(userData.numeroWhatsapp)}</Text>
                      {userData.whatsappAutorizado && (
                        <Badge color="green" size="xs" variant="light">Autorizado</Badge>
                      )}
                    </Group>
                  </div>
                </div>
              </Stack>
            </Card>
          </Grid.Col>

          {/* Coluna Direita - Informações da Conta */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" p="md" radius="md" withBorder className="h-full bg-white">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="sm" className="tracking-wider">
                Informações da Conta
              </Text>
              <Divider mb="sm" />
              
              <Stack gap={4}>
                <InfoItem icon={MdCalendarToday} label="Data de Criação" value={formatDate(userData.dataCriacao)} />
                <InfoItem icon={MdCalendarToday} label="Último Acesso" value={formatDate(userData.ultimoAcesso)} />
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Informações do Médico - Apenas para perfil de Médico (idPerfil === 3) */}
        {userData.idPerfil === 3 && userData.medico && (
          <Card shadow="sm" p="md" radius="md" withBorder className="mt-3 bg-white">
            <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="sm" className="tracking-wider">
              Informações Profissionais
            </Text>
            <Divider mb="sm" />

            <Grid gutter="xs">
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdLocalHospital} 
                  label="Especialidade" 
                  value={userData.medico.especialidade}
                  iconColor="text-green-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdVerifiedUser} 
                  label="CRM" 
                  value={userData.medico.crm}
                  iconColor="text-green-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <div className="flex items-start gap-2 py-2">
                  <MdVerifiedUser size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Text size="xs" c="dimmed" fw={500} className="mb-0.5">Status</Text>
                    <Badge 
                      color={userData.medico.ativo ? 'green' : 'red'} 
                      variant="light" 
                      size="sm"
                    >
                      {userData.medico.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdBusiness} 
                  label="Clínica" 
                  value={userData.medico.clinica}
                  iconColor="text-green-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdAttachMoney} 
                  label="Valor da Consulta" 
                  value={`R$ ${parseFloat(userData.medico.valorConsulta).toFixed(2).replace('.', ',')}`}
                  iconColor="text-green-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdAccessTime} 
                  label="Tempo de Consulta" 
                  value={`${userData.medico.tempoConsulta} minutos`}
                  iconColor="text-green-600"
                />
              </Grid.Col>
            </Grid>
          </Card>
        )}

        {/* Informações do Paciente - Apenas para perfil de Paciente (idPerfil === 4) */}
        {userData.idPerfil === 4 && (
          <Card shadow="sm" p="md" radius="md" withBorder className="mt-3 bg-white">
            <Group justify="space-between" align="center" mb="sm">
              <Text size="xs" fw={700} c="dimmed" tt="uppercase" className="tracking-wider">
                Informações Médicas
              </Text>
              <Button
                leftSection={<MdEdit size={14} />}
                variant="subtle"
                color="blue"
                size="xs"
                onClick={handleEditarPaciente}
              >
                Editar
              </Button>
            </Group>
            <Divider mb="sm" />

            <Grid gutter="xs">
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdCalendarToday} 
                  label="Data de Nascimento" 
                  value={userData.paciente?.dataNascimento ? formatDateBirth(userData.paciente.dataNascimento) : 'Não informado'}
                  iconColor="text-violet-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdPerson} 
                  label="Gênero" 
                  value={userData.paciente?.genero === 'M' ? 'Masculino' : userData.paciente?.genero === 'F' ? 'Feminino' : userData.paciente?.genero ? 'Outro' : 'Não informado'}
                  iconColor="text-violet-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdBloodtype} 
                  label="Tipo Sanguíneo" 
                  value={userData.paciente?.tipoSanguineo || 'Não informado'}
                  iconColor="text-red-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdLocalHospital} 
                  label="Convênio" 
                  value={userData.paciente?.convenio || 'Não informado'}
                  iconColor="text-violet-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoItem 
                  icon={MdPerson} 
                  label="Número da Carteirinha" 
                  value={userData.paciente?.numeroCarteirinha || 'Não informado'}
                  iconColor="text-violet-600"
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <div className="flex items-start gap-2 py-2">
                  <MdContactEmergency size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Text size="xs" c="dimmed" fw={500} className="mb-0.5">Contato de Emergência</Text>
                    <Text size="sm" fw={600} className="break-words">
                      {userData.paciente?.contatoEmergenciaNome || 'Não informado'}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {userData.paciente?.contatoEmergenciaTelefone || 'Não informado'}
                    </Text>
                  </div>
                </div>
              </Grid.Col>

              <Grid.Col span={12}>
                <Divider my="xs" />
                <div className="flex items-start gap-2 py-2">
                  <MdPerson size={16} className="text-violet-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Text size="xs" c="dimmed" fw={500} className="mb-0.5">Observações Médicas</Text>
                    <Text size="sm" fw={500} className="break-words">
                      {userData.paciente?.observacoes || 'Nenhuma observação'}
                    </Text>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Card>
        )}
        <EditarPacientePerfil
          modal={modalEditarPaciente}
          setModal={setModalEditarPaciente}
          onConfirmar={handleSalvarPaciente}
          pacienteData={getPacienteDataForEdit()}
        />
      </div>
    </div>
  );
};

export default MeuPerfil;

