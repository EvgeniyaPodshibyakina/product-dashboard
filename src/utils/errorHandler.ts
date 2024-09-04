// src/utils/errorHandler.ts
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export function getErrorMessage(error: FetchBaseQueryError | SerializedError | undefined): string | null {
  if (!error) return null;

  if ('status' in error) {
    // error is of type FetchBaseQueryError
    return `Error: ${error.status}`;
  } else if ('message' in error) {
    // error is of type SerializedError
    return `Error: ${error.message}`;
  }

  return 'An unknown error occurred';
}