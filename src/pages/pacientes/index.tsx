import { memo } from "react"
import { inputsPacientes, pacientesFil } from "./utils/filtro"
import Filtro from "../../components/filtro"
import { useImmer } from "use-immer"
import { Button } from "@mantine/core"

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
      <Button variant="gradient" gradient={{ from: '#1D4ED8', to: '#1E3A8A' }} size="xs">
        Cadastrar Paciente
      </Button>
    </div>
  )
}
export default memo(Pacientes)