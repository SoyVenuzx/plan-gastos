type AmountDisplayProps = {
  values: {
    total: number
    spent: number
    available: number
  }
}

export const AmountDisplay = ({ values }: AmountDisplayProps) => {
  const { total, spent, available } = values

  return (
    <div className='pt-4 space-y-3'>
      <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
        <span className='text-gray-600'>Presupuesto</span>
        <span className='font-medium'>${total.toLocaleString()}</span>
      </div>
      <div className='flex items-center justify-between pb-2 border-b border-gray-100'>
        <span className='text-gray-600'>Disponible</span>
        <span className='font-medium text-green-600'>
          ${available.toLocaleString()}
        </span>
      </div>
      <div className='flex items-center justify-between pb-2'>
        <span className='text-gray-600'>Gastado</span>
        <span className='font-medium text-blue-600'>
          ${spent.toLocaleString()}
        </span>
      </div>
    </div>
  )
}
