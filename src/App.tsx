import BudgetForm from './components/BudgetForm'
import { BudgetTracker } from './components/BudgetTracker'
import Header from './components/Header'
import { useBudget } from './hooks/useBudget'
import FloatingActionButton from './components/Modal/FloatingActionButton'
import CreateItemModal from './components/Modal/CreateItemModal'
import ExpenseList from './components/ExpenseList'

export const App = () => {
  const {
    state: { budget, showModal, spent, expenses, edittingId },
    dispatch
  } = useBudget()

  const modalToggle = () => {
    dispatch({ type: 'get-expense-by-id', payload: { id: '' } })
    dispatch({ type: 'show-modal' })
  }

  const openModal = () => {
    if (!edittingId && showModal === false) {
      dispatch({ type: 'show-modal' })
    }

    return false
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header appName='Mi Presupuesto' />
      <main className='container mx-auto mt-8'>
        {/* <div className='max-w-md p-6 mx-auto bg-white rounded-lg shadow-sm'> */}
        {!budget ? (
          <BudgetForm />
        ) : (
          <>
            <BudgetTracker />

            {expenses.length > 0 && <ExpenseList />}
            {budget !== spent && <FloatingActionButton onClick={openModal} />}
          </>
        )}
        {/* </div> */}
      </main>

      <CreateItemModal isOpen={showModal} onClose={modalToggle} />
    </div>
  )
}
