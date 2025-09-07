import React from 'react'
import { Drawer, Grid } from '@mui/material'
import { AdicionalPropsInput, FiltrosProps } from '../utils/interface'

import Input from '../../input-mui/input'
import InputSelect from '../../input-mui/input-select'
import Button from '../../button'
import { InputSelectProps } from '../../input-mui/input-select/utils/interface'
import { InputProps } from '../../input-mui/input/utils/interface'

const Filtros = <T, M extends boolean = false>({
  open,
  setOpen,
  onClear,
  onSubmit,
  inputs = [],
  inputSelect = [],
}: FiltrosProps<T, M>): JSX.Element => {
  const allInputs = [...inputs, ...inputSelect].sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  )

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
      return (
        <Grid item xs={input.xs ?? 1} key={`inputSelect-${i}`}>
          <InputSelect {...input} id={`inputSM${i}`} fullWidth />
        </Grid>
      )
    } else {
      return (
        <Grid item xs={input.xs ?? 1} key={`input-${i}`}>
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

        <Grid container columns={5} pr={2} rowSpacing={2} columnSpacing={1}>
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
