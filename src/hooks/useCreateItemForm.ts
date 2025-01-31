import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DraftExpense, Expense } from '@/types'
import { useBudget } from './useBudget'

const initialExpense: DraftExpense = {
  expenseName: '',
  amount: 0,
  category: '',
  date: new Date()
  // date: undefined
}

//! Validar que el gasto no supere el presupuesto actual
// TODO: Añadir funcionalidad a editar y eliminar gastos

export const useCreateItemForm = (onClose: () => void) => {
  const [expense, setExpense] = useState<DraftExpense>(initialExpense)
  const [errors, setErrors] = useState<Partial<DraftExpense>>({})

  const { dispatch } = useBudget()

  const isFormValid = (): boolean => {
    return !!(
      expense.expenseName.trim() &&
      expense.amount > 0 &&
      expense.category &&
      expense.date
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newExpense: Expense = {
      ...expense,
      id: uuidv4()
    }

    dispatch({ type: 'add-expense', payload: { expense: newExpense } })

    resetForm()
    onClose()
  }

  const updateExpense = (field: keyof DraftExpense, value: any) => {
    setExpense(prev => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const resetForm = () => {
    setExpense(initialExpense)
    setErrors({})
  }

  return {
    expense,
    errors,
    isFormValid,
    handleSubmit,
    updateExpense,
    resetForm
  }
}
