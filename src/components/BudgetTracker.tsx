import type { FC } from 'react'
import { Progress } from '@/components/ui/progress'
import { useBudget } from '@/hooks/useBudget'
import { AmountDisplay } from './AmountDisplay'
import { useMemo } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import { RotateCcw } from 'lucide-react'

export const BudgetTracker: FC = () => {
  const { state, dispatch } = useBudget()

  const { budget, spent } = state

  const available = budget - spent
  const percentage = useMemo(
    () => Math.round((spent / budget) * 100),
    [state.budget, state.spent]
  )

  const values = { total: budget, spent, available }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardContent className='pt-6'>
        <div className='space-y-6'>
          {/* Progress Circle and Percentage */}
          <div className='flex flex-col items-center justify-center space-y-4'>
            <Progress value={percentage} className='w-32 h-32 rounded-full' />
            <span className='text-3xl font-medium text-gray-800'>
              {percentage}%
            </span>
          </div>

          <AmountDisplay values={values} />
        </div>
      </CardContent>

      <CardFooter className='px-6 pb-6'>
        <Button
          size='lg'
          className='w-full '
          variant={'outline'}
          onClick={() => dispatch({ type: 'reset-budget' })}
        >
          <RotateCcw className='w-4 h-4 mr-2' />
          Reiniciar Aplicación
        </Button>
      </CardFooter>
    </Card>
  )
}
