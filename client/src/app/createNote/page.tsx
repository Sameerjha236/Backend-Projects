"use client";

import { useState } from "react";
import useNoteCreate from "@/hooks/useNoteCreate";

const Buttons = [
  { label: "B", title: "Bold: **text**" },
  { label: "I", title: "Italic: *text*" },
  { label: "H", title: "Heading: # text" },
  { label: "<>", title: "Code: `code`" },
  { label: "—", title: "Divider: ---" },
  { label: "•", title: "List: - item" },
];

const placeholder = `# My Note\n\nStart writing your note here...\n\n## Section\n\n- Point one\n- Point two\n\n\`\`\`js\nconsole.log('hello');\n\`\`\``;

const NotesPage = () => {
  const {
    title,
    setTitle,
    desc,
    setDesc,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
  } = useNoteCreate();

  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 shadow-xl shadow-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-900/90 dark:shadow-none">
          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 mb-4">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Create New Note
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              Write your note in Markdown. Add a title, description, and your
              content below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="note-title"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="note-title"
                type="text"
                required
                placeholder="e.g. Getting Started with React Hooks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="note-desc"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Description
              </label>
              <textarea
                id="note-desc"
                rows={2}
                placeholder="A brief summary of what this note is about..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="mt-2 block w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
              />
            </div>

            {/* Markdown Content Area */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="note-content"
                  className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Content <span className="text-red-500">*</span>
                </label>

                {/* Write / Preview Toggle */}
                <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-700 p-0.5">
                  <button
                    type="button"
                    onClick={() => setIsPreview(false)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      !isPreview
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPreview(true)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                      isPreview
                        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {/* Markdown toolbar hints */}
              {!isPreview && (
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {Buttons.map((btn) => (
                    <span
                      key={btn.label}
                      title={btn.title}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-500 select-none cursor-default dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                    >
                      {btn.label}
                    </span>
                  ))}
                  <span className="ml-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                    Markdown supported
                  </span>
                </div>
              )}

              {!isPreview ? (
                <textarea
                  id="note-content"
                  rows={14}
                  placeholder={placeholder}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 font-mono leading-relaxed transition-all focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10 resize-y min-h-[280px]"
                  spellCheck={false}
                />
              ) : (
                <div className="rounded-xl border border-zinc-300 bg-white px-5 py-4 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 min-h-70 overflow-auto">
                  {content.trim() ? (
                    <div className="prose prose-sm prose-zinc dark:prose-invert max-w-none whitespace-pre-wrap wrap-break-word font-mono leading-relaxed">
                      {content}
                    </div>
                  ) : (
                    <p className="text-zinc-400 dark:text-zinc-500 italic">
                      Nothing to preview yet. Start writing in the editor.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-800 hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Create Note
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
