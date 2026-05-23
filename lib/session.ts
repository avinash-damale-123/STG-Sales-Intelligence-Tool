import { cookies } from 'next/headers';
import { verifyToken, type SessionUser } from './auth';

export function getSessionUser(): SessionUser | null {
  const token = cookies().get('stg_session')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function requireSessionUser(): SessionUser {
  const user = getSessionUser();

  if (!user) {
    throw new Error('Unauthenticated');
  }

  return user;
}

export function getAllowedBranches(): string[] {
  const user = requireSessionUser();
  return user.allowedBranches || [];
}
