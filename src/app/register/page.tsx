import { SignupForm } from '@/components/signup-form'
import React from 'react'

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
                <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
                    <SignupForm />
                </div>
            </div>
  )
}
