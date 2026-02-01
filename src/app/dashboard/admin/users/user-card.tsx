import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function UserSummaryCard({ user }) {
  const statusVariant =
    user.status === "ACTIVE"
      ? "default"
      : "SUSPENDED"

  return (
    <Card className="rounded-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">User</CardTitle>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{user.role}</Badge>
            <Badge variant={statusVariant as any}>{user.status}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">Name</span>
          <span className="font-medium">{user.name ?? "—"}</span>
        </div>

        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{user.email}</span>
        </div>

        <div className="flex justify-between gap-6">
          <span className="text-muted-foreground">User ID</span>
          <span className="font-mono text-xs truncate max-w-[220px] sm:max-w-[320px]">
            {user.id}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
