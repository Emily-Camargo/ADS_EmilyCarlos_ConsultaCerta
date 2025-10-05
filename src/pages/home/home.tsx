import { useAuth } from '../../contexts/AuthContext';
import SecretariaDashboard from './components/homes/SecretariaDashboard';
import PacienteDashboard from './components/homes/PacienteDashboard';
import MedicoDashboard from './components/homes/MedicoDashboard';
import CustomLoaders from '../../components/Loader';

const Home = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <CustomLoaders open />;
  }

  if (!user) {
    return <div>Usuário não autenticado</div>;
  }

  switch (user.idPerfil) {
    case 2:
      return <SecretariaDashboard />;
    case 3:
      return <MedicoDashboard />;
    case 4:
      return <PacienteDashboard />;
    default:
      return <div>Papel de usuário não reconhecido</div>;
  }
};

export default Home;