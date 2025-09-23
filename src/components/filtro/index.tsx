import { useState } from 'react'
import FiltroCard from './components/card'
import Filtros from './components/filtros'
import { FiltroProps } from './utils/interface'

/**
 * Componente de filtro genérico que permite a busca e filtragem de dados.
 *
 *
 * @version 0.0.1
 * @author Flaviasoz
 * @date 2024-10-21
 *
 * @template T - O tipo de dados a ser filtrado.
 * @template M - Tipo que indica se a seleção múltipla está habilitada (padrão: false).
 *
 * @param {Object} props - Propriedades do componente.
 * @param {boolean} props.csv - Indica se a exportação para CSV está habilitada.
 * @param {string} props.title - Título do filtro.
 * @param {Array} props.inputs - Lista de inputs a serem exibidos no filtro.
 * @param {Function} props.onClear - Função chamada ao limpar os filtros.
 * @param {Function} props.onSubmit - Função chamada ao enviar os filtros.
 * @param {string} props.pesquisa - Valor da pesquisa.
 * @param {Object} props.excelProps - Propriedades específicas para exportação em Excel.
 * @param {Function} props.setPesquisa - Função para atualizar o valor da pesquisa.
 * @param {Array} props.inputSelect - Lista de inputs de seleção.
 *
 * @returns {JSX.Element} O componente de filtro renderizado.
 */

const Filtro = <T, M extends boolean = false>({
  csv,
  title,
  inputs,
  onClear,
  onSubmit,
  pesquisa,
  excelProps,
  setPesquisa,
  inputSelect,
}: FiltroProps<T, M>): JSX.Element => {
  const [open, setOpen] = useState(false)

  function renderFiltro(): boolean {
    return (inputs?.length ?? 0) > 0 || (inputSelect?.length ?? 0) > 0
  }

  return (
    <div>
      <FiltroCard
        csv={csv}
        title={title}
        setOpen={setOpen}
        pesquisa={pesquisa}
        excelProps={excelProps}
        setPesquisa={setPesquisa}
        renderFiltro={renderFiltro()}
      />
      <Filtros
        open={open}
        inputs={inputs}
        setOpen={setOpen}
        onClear={onClear}
        onSubmit={onSubmit}
        inputSelect={inputSelect}
      />
    </div>
  )
}

export default Filtro
