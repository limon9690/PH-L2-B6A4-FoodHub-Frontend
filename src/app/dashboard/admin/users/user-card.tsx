"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeStatusDialog } from "./status-change-dialogue";
import { adminService } from "@/service/admin.service";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";



export function UserSummaryCard({ user }) {
  const [open, setOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const router = useRouter();

  const [status, setStatus] = useState(user.status);

  const handlePick = (v) => {
    if (v === status) return;
    setNextStatus(v);
    setOpen(true);
  };

  const confirm = async () => {
    if (!nextStatus) return;

    try {
      const result = await adminService.updateUserStatus(user.id, {status: nextStatus});

      if (result?.error) {
        toast.error(result?.error?.message);
      }

      setStatus(nextStatus);
      toast.success(`Status updated to ${nextStatus}`);
      router.refresh();
    } finally {
      setOpen(false);
      setNextStatus(null);
    }
  };

  const statusVariant =
    status === "ACTIVE" ? "default" : "destructive";

  return (
    <Card className="rounded-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg">User</CardTitle>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{user.role}</Badge>
            <Badge variant={statusVariant as any}>{status}</Badge>
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


        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Status</span>

          <Select value={status} onValueChange={handlePick}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="SUSPEND">Suspend</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ChangeStatusDialog
          open={open}
          onOpenChange={(v) => {
            if (!v) setNextStatus(null);
            setOpen(v);
          }}
          nextStatus={nextStatus}
          onConfirm={confirm}
        />
      </CardContent>
    </Card>
  );
}
