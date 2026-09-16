function UserCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-4 w-10 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-5 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
      <div className="space-y-2 pt-2">
        <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
        <div className="h-3 w-4/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
      </div>
    </div>
  );
}

interface UserSkeletonProps {
  count?: number;
}

export default function UserSkeleton({ count = 6 }: UserSkeletonProps) {
  return (
    <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-3">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, i) => (
            <UserCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
