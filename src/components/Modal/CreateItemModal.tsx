import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { categories } from '@/data/categories'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { type FC } from 'react'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import { InputContainer, InputLabel } from '../utils'
import { useCreateItemForm } from '@/hooks/useCreateItemForm'

interface CreateItemModalProps {
  isOpen: boolean
  onClose: () => void
}

const CreateItemModal: FC<CreateItemModalProps> = ({ isOpen, onClose }) => {
  const {
    expense,
    errors,
    isFormValid,
    handleSubmit,
    updateExpense,
    resetForm
  } = useCreateItemForm(onClose)

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[550px]'>
        <DialogHeader>
          <DialogTitle className='text-xl text-center'>Nuevo Gasto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <InputContainer>
              <InputLabel name='name'>Nombre Gasto</InputLabel>
              <Input
                id='name'
                value={expense.expenseName}
                placeholder='Ingrese el nombre del gasto'
                onChange={e => updateExpense('expenseName', e.target.value)}
                className={cn(
                  'col-span-3',
                  errors.expenseName && 'border-red-500'
                )}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel name='amount'>Cantidad</InputLabel>
              <Input
                id='amount'
                type='number'
                value={expense.amount || ''}
                placeholder='Ingresa un monto'
                onChange={e => updateExpense('amount', +e.target.value)}
                className={cn('col-span-3', errors.amount && 'border-red-500')}
                min={0}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel name='category'>Categoría</InputLabel>
              <Select
                onValueChange={value => updateExpense('category', value)}
                value={expense.category}
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='Selecciona una categoría' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='default'>Selecciona una opción</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      <div className='flex items-center'>
                        {cat.icon && <cat.icon className='w-4 h-4 mr-2' />}
                        {cat.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputContainer>
            <InputContainer>
              <InputLabel name='date'>Fecha</InputLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'col-span-3 justify-start text-left font-normal',
                      !expense.date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className='w-4 h-4 mr-2' />
                    {expense.date ? (
                      format(expense.date, 'PPP')
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={expense.date}
                    onSelect={date => updateExpense('date', date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </InputContainer>
          </div>

          <DialogFooter>
            <Button disabled={!isFormValid()} type='submit'>
              Crear
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateItemModal
