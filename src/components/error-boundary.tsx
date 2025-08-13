'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error;
  retry?: () => void;
}

export function ErrorDisplay({ error, retry }: ErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  useEffect(() => {
    console.error('Error caught by boundary:', error);
  }, [error]);

  const handleRetry = () => {
    reset();
    retry?.();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-8">
      <div className="text-center max-w-md">
        <div className="mb-4">
          <svg className="mx-auto w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        <p className="text-gray-600 mb-4">
          {error.message || 'An unexpected error occurred while loading data.'}
        </p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}

export function EmptyState({ 
  title = "No results found", 
  description = "Try adjusting your search or filters.",
  icon
}: { 
  title?: string; 
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-8">
      <div className="text-center max-w-md">
        <div className="mb-4">
          {icon || (
            <svg className="mx-auto w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}