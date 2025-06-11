import { type PropsWithChildren } from 'react'

export default function SuccessMessage({ children }: Readonly<PropsWithChildren>) {
  return (
    <p className='bg-green-600 p-2 text-white font-bold text-sm text-center'>{children}</p>
  )
}
