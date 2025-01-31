import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export type Expense = {
  id: string
  expenseName: string
  amount: number
  category: string
  date: Date | undefined
}

export type DraftExpense = Omit<Expense, 'id'>

export type Category = {
  id: string
  name: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
}
