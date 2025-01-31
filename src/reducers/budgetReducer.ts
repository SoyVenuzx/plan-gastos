import { Expense } from '@/types'

export type BudgetState = {
  expenses: Expense[]
  budget: number
  spent: number
  showModal: boolean
}

export const initialState: BudgetState = {
  expenses: [],
  budget: 0,
  spent: 0,
  showModal: false
}

export type BudgetActions =
  | {
      type: 'add-budget'
      payload: { budget: number }
    }
  | {
      type: 'show-modal'
    }
  | {
      type: 'reset-budget'
    }
  | {
      type: 'add-expense'
      payload: { expense: Expense }
    }

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  switch (action.type) {
    case 'add-budget':
      return { ...state, budget: action.payload.budget }

    case 'show-modal':
      return { ...state, showModal: !state.showModal }

    case 'reset-budget':
      return initialState

    case 'add-expense':
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
        spent: state.spent + action.payload.expense.amount
      }

    default:
      return state
  }
}
