import React from 'react'
import Button from '../../../components/button'
import { Drawer, Grid } from '@mui/material'
import Input from '../../../components/input-mui/input/index'
import InputSelect from '../../../components/input-mui/input-select'
import { AdicionalPropsInput, FiltrosProps } from '../utils/interface'
import { InputProps } from '../../../components/input-mui/input/utils/interface'
import { InputSelectProps } from '../../../components/input-mui/input-select/utils/interface'
import { useDimension } from '../../../hooks'

/**
 * Componente que renderiza um drawer com campos de filtros personalizáveis.
 *
 * @template T - Tipo dos dados utilizados nos filtros.
 * @template M - Tipo opcional que define um parâmetro booleano.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {boolean} props.open - Estado que determina se o drawer está aberto.
 * @param {Function} props.setOpen - Função para alterar o estado do drawer.
 * @param {Function} [props.onClear] - Função chamada ao limpar os filtros.
 * @param {Function} [props.onSubmit] - Função chamada ao submeter os filtros.
 * @param {(InputProps & AdicionalPropsInput)[]} [props.inputs] - Lista de entradas do tipo Input.
 * @param {(InputSelectProps<T, M> & AdicionalPropsInput)[]} [props.inputSelect] - Lista de entradas do tipo InputSelect.
 *
 * @returns {JSX.Element} O drawer com campos de filtro.
 */
const Filtros = <T, M extends boolean = false>({
  open,
  setOpen,
  onClear,
  onSubmit,
  inputs = [],
  inputSelect = [],
}: FiltrosProps<T, M>): JSX.Element => {
  const m640 = useDimension(640)
  const m1120 = useDimension(1120)

  const allInputs = [...inputs, ...inputSelect].sort((a, b) => {
    const orderA =
      'textFieldProps' in a && a.textFieldProps
        ? a.textFieldProps.order ?? 99
        : 99
    const orderB = 'order' in b ? b.order ?? 99 : 99

    return orderA - orderB
  })

  const isInputSelect = (
    obj: Omit<InputProps, 'sx'> | Omit<InputSelectProps<T, M>, 'sx'>,
  ): obj is Omit<InputSelectProps<T, M>, 'sx'> => {
    return 'options' in obj
  }

  const render = (
    input:
      | (Omit<InputProps, 'sx'> & AdicionalPropsInput)
      | (Omit<InputSelectProps<T, M>, 'sx'> & AdicionalPropsInput),
    i: number,
  ) => {
    if (isInputSelect(input)) {
      const inputSelectWithXs = input as Omit<InputSelectProps<T, M>, 'sx'> & AdicionalPropsInput
      return (
        <Grid item xs={inputSelectWithXs.xs ?? 1} key={`inputSelect-${i}`}>
          <InputSelect {...input} id={`inputSM${i}`} fullWidth />
        </Grid>
      )
    } else {
      const inputWithXs = input as Omit<InputProps, 'sx'> & AdicionalPropsInput
      return (
        <Grid item xs={inputWithXs.xs ?? 1} key={`input-${i}`}>
          <Input {...input} fullWidth />
        </Grid>
      )
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) {
      onSubmit(event)
      setOpen(false)
    }
  }

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ [`& .MuiDrawer-paper`]: { borderRadius: '0px 0px 20px 20px' } }}
    >
      <form
        className="w-full flex flex-col pl-5 py-4 select-none"
        onSubmit={handleSubmit}
      >
        <p className="text-system-900 font-semibold text-lg">Filtros</p>
        <p className="text-system-700 text-sm pt-1 pb-5">
          Para que possamos apresentar dados específicos, por favor, preencha os
          campos abaixo.
        </p>

        <Grid
          container
          pr={2}
          rowSpacing={2}
          columnSpacing={1}
          columns={(m640 && 1) || (m1120 && 3) || 7}
        >
          {allInputs.map((input, index) => render(input, index))}
        </Grid>
        <div className="flex justify-end pt-4 space-x-4 pr-4">
          {onClear && (
            <Button onClick={onClear} variant="outlined" color="secondary">
              Limpar Filtros
            </Button>
          )}
          {onSubmit && (
            <Button variant="contained" type="submit">
              Pesquisar
            </Button>
          )}
        </div>
      </form>
    </Drawer>
  )
}

export default Filtros
