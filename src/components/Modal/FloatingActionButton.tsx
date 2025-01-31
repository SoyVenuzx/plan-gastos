import type { FC } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingActionButtonProps {
  onClick: () => void
}

const FloatingActionButton: FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <Button
      className='fixed w-12 h-12 rounded-full shadow-lg bottom-6 right-6'
      onClick={onClick}
    >
      <Plus className='w-6 h-6' />
    </Button>
  )
}

export default FloatingActionButton
