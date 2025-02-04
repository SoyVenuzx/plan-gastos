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

export const useCreateItemForm = (
  onClose: () => void
  // expenseEdit: DraftExpense
) => {
  const [expense, setExpense] = useState<DraftExpense>(initialExpense)
  const [errors, setErrors] = useState<Partial<DraftExpense>>({})

  const { state, dispatch } = useBudget()

  const isFormValid = (): boolean => {
    return !!(
      expense.expenseName.trim() &&
      expense.amount > 0 &&
      expense.amount <= state.budget &&
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

    if (state.edittingId) {
      dispatch({ type: 'update-expense', payload: { expense: newExpense } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense: newExpense } })
    }

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

  const validateExpense = () => {
    return expense.amount > state.budget
  }

  return {
    expense,
    errors,
    isFormValid,
    handleSubmit,
    updateExpense,
    resetForm,
    validateExpense
  }
}
