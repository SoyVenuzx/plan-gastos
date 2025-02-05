import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Card, CardContent } from './ui/card'
import { categories } from '@/data/categories'
import { useBudget } from '@/hooks/useBudget'

export const FilterExpense = () => {
  const { state, dispatch } = useBudget()

  return (
    <>
      <Card className='max-w-4xl mx-auto mt-8'>
        <CardContent className='flex items-center justify-between w-full p-4 gap-7'>
          <div className='w-40'>
            <h2 className='w-full text-lg text-right'>Filtrar Gastos</h2>
          </div>
          <Select
            onValueChange={value =>
              dispatch({ type: 'filter-expenses', payload: { filter: value } })
            }
            value={state.filter}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecciona una categoría' />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='all'>Todos</SelectItem>

              {categories.map(cat => {
                return (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className='flex items-center'>
                      {cat.icon && <cat.icon className='w-4 h-4 mr-2' />}
                      {cat.name}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </>
  )
}
