import {
  Route,
  Routes,
  useLocation,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import CustomLoaders from './components/Loader'

const Navbar = lazy(() => import('./components/navbar'))

const Acessar = lazy(() => import('./pages/login/index'))
const Home = lazy(() => import('./pages/home/home'))
const Pacientes = lazy(() => import('./pages/pacientes/index'))

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
      element: <Home />,
    },
    {
      path: '/pacientes',
      element: <Pacientes />,
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
