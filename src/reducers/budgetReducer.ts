import { Expense } from '@/types'

export type BudgetState = {
  expenses: Expense[]
  budget: number
  spent: number
  showModal: boolean
  edittingId: Expense['id']
  filter: string
}

export const initialState: BudgetState = {
  expenses: [],
  budget: 0,
  spent: 0,
  showModal: false,
  edittingId: '',
  filter: ''
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
  | {
      type: 'remove-expense'
      payload: { id: string }
    }
  | {
      type: 'update-spent'
      payload: { spent: number }
    }
  | {
      type: 'get-expense-by-id'
      payload: { id: string }
    }
  | {
      type: 'update-expense'
      payload: { expense: Expense }
    } | {
      type: 'filter-expenses'
      payload: { filter: string }
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

    case 'remove-expense':
      console.log({removeid: action.payload.id})

      if (state.expenses.length === 1) {
        localStorage.setItem('expenses', JSON.stringify([]))

        return {
          ...state,
          expenses: [],
          spent: 0
        } 
      }

      return {
        ...state,
        expenses:  state.expenses.filter(
          expense => expense.id !== action.payload.id
        )
      }

    case 'reset-budget':
      localStorage.clear()
      return initialState

    case 'add-expense':
      return {
        ...state,
        expenses: [...state.expenses, action.payload.expense],
        spent: state.spent + action.payload.expense.amount
      }

    case 'update-spent':
      return { ...state, spent: action.payload.spent }

    case 'get-expense-by-id':
      return {
        ...state,
        edittingId: action.payload.id,
        showModal: true
      }

    case 'update-expense':
      const updatedExpenses = state.expenses.map(expense =>
        expense.id === state.edittingId ? action.payload.expense : expense
      )

      return {
        ...state,
        expenses: updatedExpenses
      }

      case 'filter-expenses':
        return {
          ...state,
          filter: action.payload.filter
        }

    default:
      return state
  }
}
