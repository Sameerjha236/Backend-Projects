"use client";

import { useState } from "react";
import ErrorState from "@/components/user/ErrorState";
import Pagination from "@/components/common/Pagination";
import UserCard from "@/components/user/UserCard";
import UserSkeleton from "@/components/user/UserSkeleton";
import useUserDetails from "@/hooks/getUserDetails";

const ITEMS_PER_PAGE = 10;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const { users, isLoading, error, refetch, totalPages, total } =
    useUserDetails(currentPage, ITEMS_PER_PAGE);

  if (isLoading) {
    return <UserSkeleton />;
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={() => refetch()} />;
  }

  return (
    <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              Feed Overview
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              User Details & Posts
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Browse recent activity, user submissions, and item details.
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 self-start sm:self-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-300 shadow-sm">
              <span>Total Entries:</span>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {total}
              </span>
            </div>
            {totalPages > 0 && (
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>
        </header>

        {/* Empty State */}
        {users.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="mt-3 text-base font-medium text-zinc-900 dark:text-zinc-100">
              No entries found
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              There are currently no user details to display.
            </p>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        )}
      </div>
    </main>
  );
}
