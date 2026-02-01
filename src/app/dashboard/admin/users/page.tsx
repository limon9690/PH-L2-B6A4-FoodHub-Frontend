import { userService } from '@/service/user.service'
import React from 'react'
import { UserSummaryCard } from './user-card';

export default async function page() {
  const users = await userService.getAllUsers();
  return (
        <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            View user info, role, and account status.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((u) => (
          <UserSummaryCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  )
}
