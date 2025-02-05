import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { categories } from '@/data/categories'
import { FC, useMemo } from 'react'
import { useBudget } from '@/hooks/useBudget'
import { Pencil } from 'lucide-react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'

const ExpenseList: FC = () => {
  const { state, dispatch } = useBudget()

  const filteredItems = useMemo(() => {
    if (!state.filter || state.filter === 'all') return state.expenses

    return state.expenses.filter(item => item.category === state.filter)
  }, [state.expenses, state.filter])

  return (
    <Card className='max-w-4xl mx-auto mt-10'>
      <div className='flex items-center justify-center p-2 mt-4'>
        <CardTitle className='text-2xl font-bold text-center text-primary'>
          Gastos Realizados
        </CardTitle>
      </div>
      <div className='px-5'>
        <div className='w-full mt-12 mb-10 overflow-y-auto border rounded-md'>
          {filteredItems.map(expense => {
            const category = categories.find(c => c.id === expense.category)
            if (!category) return null

            return (
              <div key={expense.id} className='mb-6 last:mb-0'>
                <div className='sticky top-0 z-10 flex items-center p-2 bg-background'>
                  <category.icon className='w-5 h-5 mr-2' />
                  <h3 className='text-lg font-semibold'>{category.name}</h3>
                </div>
                <Card key={expense.id} className='mb-2 rounded-none last:mb-0'>
                  <CardContent className='flex items-center justify-between p-4'>
                    <div className='flex-grow'>
                      <p className='font-medium'>{expense.expenseName}</p>
                      <p className='text-sm text-muted-foreground'>
                        {expense.date ? expense.date.toLocaleDateString() : ''}
                      </p>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <p className='mr-4 text-lg font-semibold'>
                        ${expense.amount.toFixed(2)}
                      </p>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                          dispatch({
                            type: 'get-expense-by-id',
                            payload: { id: expense.id }
                          })
                        }
                      >
                        <Pencil className='w-4 h-4' />
                        <span className='sr-only'>Editar</span>
                      </Button>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={() =>
                          dispatch({
                            type: 'remove-expense',
                            payload: { id: expense.id }
                          })
                        }
                      >
                        <Trash2 className='w-4 h-4' />
                        <span className='sr-only'>Eliminar</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
          {filteredItems.length === 0 && (
            <div className='flex items-center justify-center h-40'>
              <p className='text-lg text-muted-foreground'>
                No hay gastos para mostrar
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default ExpenseList
