import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState
} from '@/reducers/budgetReducer'
import { parseISO } from 'date-fns'
import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { Expense } from '../types/index'

type BudgetContextType = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
}

const BudgetContext = createContext<BudgetContextType>({} as BudgetContextType)

const init = (): BudgetState => {
  const expenses = localStorage.getItem('expenses')
  const amount = localStorage.getItem('amount')

  const budget = amount ? +amount : 0

  const formattedExpenses = JSON.parse(expenses!)?.map((expense: Expense) => ({
    ...expense,
    date: parseISO(String(expense.date))
  }))

  return expenses
    ? { ...initialState, expenses: formattedExpenses, budget }
    : initialState
}

const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(budgetReducer, init())

  useEffect(() => {
    if (state.expenses.length === 0) return

    const totalSpent = state.expenses.reduce(
      (acc, curr) => acc + curr.amount,
      0
    )

    dispatch({ type: 'update-spent', payload: { spent: totalSpent } })
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
    localStorage.setItem('amount', JSON.stringify(state.budget))
  }, [state?.expenses])

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  )
}

export { BudgetContext, BudgetProvider }
