import { useAuth } from '../../contexts/AuthContext';
import SecretariaDashboard from './components/SecretariaDashboard';
import PacienteDashboard from './components/PacienteDashboard';
import MedicoDashboard from './components/MedicoDashboard';
import CustomLoaders from '../../components/Loader';

const Home = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoaders open />;
  }

  if (!user) {
    return <div>Usuário não autenticado</div>;
  }

  switch (user.indPapel) {
    case 1: // Secretária
      return <SecretariaDashboard />;
    case 2: // Paciente
      return <PacienteDashboard />;
    case 3: // Médico
      return <MedicoDashboard />;
    default:
      return <div>Papel de usuário não reconhecido</div>;
  }
};

export default Home;