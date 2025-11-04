import {
  Route,
  Routes,
  useLocation,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import CustomLoaders from './components/Loader'
import { ProtectedRoute } from './components/ProtectedRoute'

const Navbar = lazy(() => import('./components/navbar'))

const Acessar = lazy(() => import('./pages/login/index'))
const Home = lazy(() => import('./pages/home/home'))
const Pacientes = lazy(() => import('./pages/pacientes/index'))
const Agenda = lazy(() => import('./pages/agenda/index'))
const Consultas = lazy(() => import('./pages/consultas/index'))
const MinhasConsultas = lazy(() => import('./pages/minhas-consultas/index'))
const Atendimentos = lazy(() => import('./pages/atendimentos/index'))
const ProntuarioAtendimento = lazy(() => import('./pages/atendimentos/ProntuarioAtendimento'))
const MeuPerfil = lazy(() => import('./pages/perfil/index'))
const Prescricoes = lazy(() => import('./pages/prescricoes/index'))
const Prontuarios = lazy(() => import('./pages/prontuarios/index'))
const Relatorios = lazy(() => import('./pages/relatorios/index'))

function App() {
  const location = useLocation()

  const hideNavbarRoutes = ['/acessar']

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  const routes = [
    {
      path: '/acessar',
      element: <Acessar />,
    },
    {
      path: '/home',
      element: <ProtectedRoute><Home /></ProtectedRoute>,
    },
    {
      path: '/pacientes',
      element: <ProtectedRoute><Pacientes /></ProtectedRoute>,
    },
    {
      path: '/agenda',
      element: <ProtectedRoute><Agenda /></ProtectedRoute>,
    },
    {
      path: '/consultas',
      element: <ProtectedRoute><Consultas /></ProtectedRoute>,
    },
    {
      path: '/minhas-consultas',
      element: <ProtectedRoute><MinhasConsultas /></ProtectedRoute>,
    },
    {
      path: '/atendimentos',
      element: <ProtectedRoute><Atendimentos /></ProtectedRoute>,
    },
    {
      path: '/prontuario-atendimento/:idPaciente/:idConsulta',
      element: <ProtectedRoute><ProntuarioAtendimento /></ProtectedRoute>,
    },
    {
      path: '/perfil',
      element: <ProtectedRoute><MeuPerfil /></ProtectedRoute>,
    },
    {
      path: '/prescricoes',
      element: <ProtectedRoute><Prescricoes /></ProtectedRoute>,
    },
    {
      path: '/prontuarios',
      element: <ProtectedRoute><Prontuarios /></ProtectedRoute>,
    },
    {
      path: '/relatorios',
      element: <ProtectedRoute><Relatorios /></ProtectedRoute>,
    },
  ]

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Suspense fallback={<CustomLoaders open />}>
        <Routes>
          {routes.map((v) => (
            <Route
              key={v.path}
              path={v.path}
              element={v.element}
            />
          ))}
          <Route path="/" element={<Navigate to="/acessar" />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default function AppRouter() {
  return (
    <Router>
      <App />
    </Router>
  )
}
