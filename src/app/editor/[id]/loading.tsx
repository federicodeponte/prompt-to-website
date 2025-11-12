// ABOUTME: Loading state for editor page
// ABOUTME: Displayed while fetching website data from database

/**
 * Loading skeleton for editor
 * Shown during server-side data fetch
 */
export default function Loading() {
  return (
    <div className="flex h-screen animate-pulse">
      {/* Left panel skeleton */}
      <div className="w-2/5 border-r bg-gray-50 p-4">
        <div className="mb-4 h-8 w-32 rounded bg-gray-200" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="flex-1 bg-white p-4">
        <div className="mb-4 h-8 w-48 rounded bg-gray-200" />
        <div className="space-y-6">
          <div className="h-32 w-full rounded bg-gray-100" />
          <div className="h-24 w-full rounded bg-gray-100" />
          <div className="h-40 w-full rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
