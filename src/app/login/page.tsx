import { LoginForm } from '@/components/login-form'
import React from 'react'

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <div className="w-full max-w-md rounded-lg border bg-background p-6 shadow-sm">
                <LoginForm />
            </div>
        </div>

    )
}
