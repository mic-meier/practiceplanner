import { ReactNode } from 'react'

export function FormContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center min-h-screen p-20 bg-gray-100">
      <div className="mx-auto my-auto py-10 px-16 bg-white rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  )
}
