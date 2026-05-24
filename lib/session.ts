import { cookies } from 'next/headers';
import { verifyToken, type SessionUser } from './auth';

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('stg_session')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function requireSessionUser(): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    throw new Error('Unauthenticated');
  }

  return user;
}

export async function getAllowedBranches(): Promise<string[]> {
  const user = await requireSessionUser();
  return user.allowedBranches || [];
}
