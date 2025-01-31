import type { FC } from 'react'

interface HeaderProps {
  appName: string
}

const Header: FC<HeaderProps> = ({ appName }) => {
  return (
    <header className='py-4 bg-black text-white'>
      <h1 className='text-2xl font-semibold text-center'>{appName}</h1>
    </header>
  )
}

export default Header
