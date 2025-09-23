import { Tooltip } from '@mantine/core'
import { IconButton } from '@mui/material'
import Input from '../../../components/input-mui/input'
import { FiltroCardProps } from '../utils/interface'
import { FunnelIcon } from '@heroicons/react/24/solid'
import { ExcelIcon, Loading } from '../../../components/icons'
import ButtonExcel from '../../../components/button/button-excel'
import { Suspense, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '../../../lib/utils'

const FiltroCard = <T,>({
  csv,
  title,
  setOpen,
  pesquisa,
  excelProps,
  setPesquisa,
  renderFiltro,
}: FiltroCardProps<T>): JSX.Element => {
  const location = useLocation()

  // Mapeamento de rotas para nomes de tela
  const screenName = useMemo(() => {
    const routeNames: Record<string, string> = {
      '/home': 'Home',
      '/pacientes': 'Pacientes',
      '/acessar': 'Acessar',
    }
    
    return routeNames[location.pathname] || 'Página'
  }, [location.pathname])

  return (
    <div className="h-15 flex items-center w-full bg-white shadow-3-strong mb-2 rounded-md">
      <div className="h-full w-2 bg-grzprimary rounded-tl-md rounded-bl-md" />
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden ml-1 text-black/80">
          {title ?? screenName}
        </h1>
        <div className="flex items-center space-x-4">
          {renderFiltro && (
            <Tooltip
              withArrow
              arrowSize={4}
              color="#00b2a6"
              arrowOffset={20}
              label="Ver filtros"
              position="bottom-end"
              transitionProps={{ transition: 'pop', duration: 300 }}
            >
              <span className="flex items-center">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-grzprimary h-10 w-10 rounded-md flex items-center justify-center transition-all duration-500 hover:bg-grzsecondary shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20"
                >
                  <FunnelIcon className="h-7 w-7 text-white" />
                </button>
              </span>
            </Tooltip>
          )}
          {csv && (
            <Tooltip
              withArrow
              arrowSize={4}
              color="#00b2a6"
              arrowOffset={20}
              label="Ver filtros"
              position="bottom-end"
              transitionProps={{ transition: 'pop', duration: 300 }}
            >
              <span>
                <IconButton
                  className={cn('bg-grzprimary min-w-10 min-h-10', {
                    'bg-system-100': csv.isLoading,
                  })}
                  onClick={csv.onClick}
                  disabled={csv.isLoading}
                >
                  {csv.isLoading ? <Loading /> : <ExcelIcon />}
                </IconButton>
              </span>
            </Tooltip>
          )}
          {excelProps && !csv && (
            <Suspense>
              <ButtonExcel {...excelProps} />
            </Suspense>
          )}
          {setPesquisa && (
            <Input
              type="search"
              value={pesquisa}
              placeholder="Digite para filtrar"
              onChange={(e) => setPesquisa(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FiltroCard
