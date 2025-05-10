import React from "react";

export const TherapistSkeleton: React.FC = () => {
  return (
    <div className="bg-[#1e293b] rounded-lg shadow-lg border border-gray-700 overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="w-32 h-32 rounded-lg bg-gray-700" />
            <div className="h-6 bg-gray-600 mt-2 rounded w-24 mx-auto" />
          </div>

          {/* Info Placeholder */}
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-600 rounded w-1/2" />
            <div className="h-4 bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-600 rounded w-1/4" />

            <div className="mt-4">
              <div className="h-4 bg-gray-700 w-24 rounded mb-2" />
              <div className="flex gap-2 flex-wrap">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 w-16 bg-gray-700 rounded-full" />
                ))}
              </div>
            </div>

            <div className="mt-3">
              <div className="h-4 bg-gray-700 w-20 rounded mb-1" />
              <div className="h-4 bg-gray-600 w-40 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="flex border-b border-gray-700">
          <div className="flex-1 py-3 px-4">
            <div className="h-4 bg-gray-700 w-16 mx-auto rounded" />
          </div>
          <div className="flex-1 py-3 px-4">
            <div className="h-4 bg-gray-700 w-20 mx-auto rounded" />
          </div>
        </div>

        <div className="p-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="h-4 bg-gray-700 w-24 rounded mb-2" />
            <div className="h-4 w-20 bg-gray-600 rounded" />
          </div>

          <div>
            <div className="h-4 bg-gray-700 w-28 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-600 rounded" />
          </div>

          <div className="ml-auto">
            <div className="h-10 w-24 bg-gray-600 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistSkeleton;
