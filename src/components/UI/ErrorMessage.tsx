import React from 'react';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
  className
}) => {
  return (
    <div className={clsx(
      'flex items-center p-4 bg-red-50 border border-red-200 rounded-lg dark:bg-red-900/20 dark:border-red-800',
      className
    )}>
      <XCircleIcon className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400" />
      <div className="ml-3 flex-1">
        <p className="text-sm text-red-800 dark:text-red-200">
          {message}
        </p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 p-1 rounded-md text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800/30 transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};