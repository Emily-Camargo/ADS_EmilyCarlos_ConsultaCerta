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

  switch (user.indPapel) {
    case 1:
      return <SecretariaDashboard />;
    case 2:
      return <PacienteDashboard />;
    case 3:
      return <MedicoDashboard />;
    default:
      return <div>Papel de usuário não reconhecido</div>;
  }
};

export default Home;