import { UserDetail } from "@/types/UserDetail";

interface UserCardProps {
  user: UserDetail;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <article className="group flex flex-col justify-between bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div>
        {/* Card Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <svg
              className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            User {user.userId}
          </span>
          <span className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
            #{user.id}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 capitalize leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {user.title}
        </h2>

        {/* Body Content */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2.5 line-clamp-4">
          {user.body}
        </p>
      </div>

      {/* Card Footer Metadata */}
      <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
        <span>Author ID: {user.userId}</span>
        <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1">
          Details
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </div>
    </article>
  );
}
