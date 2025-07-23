import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string | null {
  if (!error) return null;

  if ('status' in error) {
    return `Error: ${error.status}`;
  } else if ('message' in error) {
    return `Error: ${error.message}`;
  }

  return 'An unknown error occurred';
}