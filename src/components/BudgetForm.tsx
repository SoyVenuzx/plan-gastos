import { type FC, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useBudget } from '@/hooks/useBudget'

const BudgetForm: FC = () => {
  const { state, dispatch } = useBudget()

  const [budget, setBudget] = useState(state.budget)

  const handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(+value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (budget <= 0) return

    dispatch({
      type: 'add-budget',
      payload: { budget: budget }
    })
  }

  const isValid = useMemo(() => budget > 0, [budget])

  return (
    <div className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-sm'>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <h2 className='text-xl font-semibold text-gray-800'>
          Definir Presupuesto
        </h2>
        <Input
          id='BudgetID'
          type='number'
          value={budget === 0 ? '' : budget}
          onChange={handleChange}
          placeholder='Ingrese el presupuesto'
          className='w-full'
        />
        <Button type='submit' className='w-full' disabled={!isValid}>
          Guardar
        </Button>
      </form>
    </div>
  )
}

export default BudgetForm
