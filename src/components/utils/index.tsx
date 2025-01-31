import { Label } from '@/components/ui/label'

export const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className='grid items-center grid-cols-4 gap-4'>{children}</div>
}

export const InputLabel = ({
  name,
  children
}: {
  name: string
  children: React.ReactNode
}) => {
  return (
    <Label className='text-center' htmlFor={name}>
      {children}
    </Label>
  )
}
