import { memo } from "react"
import { inputsPacientes, pacientesFil } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"

function Pacientes() {
  const [data, setData] = useImmer(pacientesFil)


  const searchClick = () => {
    console.log('searchClick')
  }

  const redefinir = () => {
    setData(pacientesFil)
  }


  return (
    <div className="p-6 max-sm:p-4 bg-white">
      <Filtro
        onSubmit={searchClick}
        onClear={redefinir}
        inputs={inputsPacientes({ data, setData })}
      />
    </div>
  )
}
export default memo(Pacientes)