/**
 * Error service for handling and transforming errors
 */

export interface AppError {
  message: string;
  status?: number;
  data?: any;
}

/**
 * Transform error to user-friendly message
 */
export function getErrorMessage(error: unknown): string {
  const status = getErrorStatus(error);
  if (status === 401 || status === 403) return 'Invalid email or password. Please check your credentials and try again.';

  let message = '';
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else {
    return 'An unexpected error occurred. Please try again.';
  }

  const lowerMessage = message.toLowerCase();
  if (
    lowerMessage.includes('invalid credentials') ||
    lowerMessage.includes('unauthorized') ||
    (lowerMessage.includes('401') && (lowerMessage.includes('status') || lowerMessage.includes('failed'))) ||
    (lowerMessage.includes('403') && (lowerMessage.includes('status') || lowerMessage.includes('failed'))) ||
    lowerMessage.includes('request failed with status') ||
    lowerMessage.includes('request failed with status code')
  ) return 'Invalid email or password';

  return message || 'An unexpected error occurred. Please try again.';
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('Network') || error.message.includes('network');
  }
  return false;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: unknown): boolean {
  if (error && typeof error === 'object' && 'status' in error) {
    return error.status === 401 || error.status === 403;
  }
  return false;
}

/**
 * Get error status code
 */
export function getErrorStatus(error: unknown): number | undefined {
  if (error instanceof Error) {
    const status = (error as any).status;
    if (typeof status === 'number') {
      return status;
    }
  }

  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status;
    if (typeof status === 'number') {
      return status;
    }
  }
  
  return undefined;
}
