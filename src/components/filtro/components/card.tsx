import { Tooltip } from '@mantine/core'
import { FiltroCardProps } from '../utils/interface'
import { FunnelIcon } from '@heroicons/react/24/solid'
import Input from '../../input-mui/input'

const FiltroCard = <T,>({
  setOpen,
  pesquisa,
  setPesquisa,
  renderFiltro,
  title,
}: FiltroCardProps<T>): JSX.Element => {

  return (
    <div className="h-15 flex items-center w-full bg-white shadow-md mb-4 rounded-2xl bg-opacity-50 backdrop-blur-md">
      <div className="h-15 w-3 bg-grzprimary rounded-tl-3xl rounded-bl-3xl" />
      <div className="w-full flex justify-between items-center p-3">
        <h1 className="font-semibold text-lg whitespace-nowrap text-ellipsis overflow-hidden mt-2 text-black/80">
        {title}
        </h1>
        <div className="flex items-center space-x-4">
          {renderFiltro && (
            <Tooltip
              withArrow
              arrowSize={4}
              color="#4b1e8c "
              arrowOffset={20}
              label="Ver filtros"
              position="bottom-end"
              transitionProps={{ transition: 'pop', duration: 300 }}
            >
              <span className="flex items-center">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-grzprimary h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 hover:bg-grzsecondary shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20"
                >
                  <FunnelIcon className="h-7 w-7 text-white" />
                </button>
              </span>
            </Tooltip>
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
