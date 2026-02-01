"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 space-y-3">
      <p className="font-medium">Something went wrong</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button className="underline" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
