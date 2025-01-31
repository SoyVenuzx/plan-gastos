import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState
} from '@/reducers/budgetReducer'
import { createContext, Dispatch, useEffect, useReducer } from 'react'

type BudgetContextType = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
}

const BudgetContext = createContext<BudgetContextType>({} as BudgetContextType)

const BudgetProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  useEffect(() => console.log(state), [state])

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  )
}

export { BudgetContext, BudgetProvider }
