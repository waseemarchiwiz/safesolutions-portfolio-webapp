export default function DashboardSkeleton() {
  // This component will be automatically displayed by Next.js when the page is loading.

  // Helper component for a single skeleton row to keep the code clean
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      {/* Checkbox cell */}
      <td className="w-4 p-4">
        <div className="h-4 w-4 rounded bg-gray-300"></div>
      </td>
      {/* Product Name cell */}
      <td className="px-6 py-4">
        <div className="h-4 w-48 rounded bg-gray-300"></div>
        <div className="mt-2 h-3 w-32 rounded bg-gray-200"></div>
      </td>
      {/* Status cell */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 rounded-full bg-gray-300"></div>
      </td>
      {/* Category cell */}
      <td className="px-6 py-4">
        <div className="h-4 w-24 rounded bg-gray-300"></div>
      </td>
      {/* Price cell */}
      <td className="px-6 py-4">
        <div className="h-4 w-16 rounded bg-gray-300"></div>
      </td>
      {/* Actions cell */}
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-5 w-5 rounded bg-gray-300"></div>
          <div className="h-5 w-5 rounded bg-gray-300"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar Skeleton */}
        <div className="w-full sm:w-1/3">
          <div className="h-10 w-full rounded-lg bg-gray-300 animate-pulse"></div>
        </div>
        {/* Action Buttons Skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-10 w-24 rounded-lg bg-gray-300 animate-pulse"></div>
          <div className="h-10 w-24 rounded-lg bg-gray-300 animate-pulse"></div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                {/* Headers with varying widths */}
                <th className="p-4 w-4">
                  <div className="h-4 w-4 rounded bg-gray-200"></div>
                </th>
                <th className="px-6 py-3 w-2/5">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-16 rounded bg-gray-200"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-12 rounded bg-gray-200"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-16 rounded bg-gray-200"></div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Render multiple skeleton rows to simulate a full table */}
              {[...Array(8)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="h-8 w-32 rounded-lg bg-gray-300 animate-pulse"></div>
        <div className="flex items-center space-x-2">
          <div className="h-9 w-20 rounded-md bg-gray-300 animate-pulse"></div>
          <div className="flex -space-x-px">
            <div className="h-9 w-9 rounded-l-md bg-gray-300 animate-pulse"></div>
            <div className="h-9 w-9 bg-gray-200 animate-pulse"></div>
            <div className="h-9 w-9 bg-gray-300 animate-pulse"></div>
            <div className="h-9 w-9 rounded-r-md bg-gray-300 animate-pulse"></div>
          </div>
          <div className="h-9 w-20 rounded-md bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
