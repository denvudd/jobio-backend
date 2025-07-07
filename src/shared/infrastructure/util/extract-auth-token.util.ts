import { Request } from 'express';

/**
 * Extracts the access token from the Authorization header
 * @param request - Express request object
 * @returns The access token without 'Bearer ' prefix, or null if not found
 */
export function extractAuthToken(request: Request): string | null {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.replace('Bearer ', '');
}

/**
 * Extracts the access token from the Authorization header and throws an error if not found
 * @param request - Express request object
 * @returns The access token without 'Bearer ' prefix
 * @throws Error if no valid authorization header is found
 */
export function extractAuthTokenOrThrow(request: Request): string {
  const token = extractAuthToken(request);

  if (!token) {
    throw new Error('Access token is required');
  }

  return token;
}
