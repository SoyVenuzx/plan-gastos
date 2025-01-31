import {
  PiggyBank,
  Utensils,
  Home,
  ShoppingBag,
  Stethoscope,
  Bookmark
} from 'lucide-react'
import { Category } from '@/types'
export const categories: Category[] = [
  { id: '1', name: 'Ahorro', icon: PiggyBank },
  { id: '2', name: 'Comida', icon: Utensils },
  { id: '3', name: 'Casa', icon: Home },
  { id: '4', name: 'Gastos Varios', icon: ShoppingBag },
  { id: '5', name: 'Ocio', icon: Bookmark },
  { id: '6', name: 'Salud', icon: Stethoscope },
  { id: '7', name: 'Suscripciones', icon: Bookmark }
]
