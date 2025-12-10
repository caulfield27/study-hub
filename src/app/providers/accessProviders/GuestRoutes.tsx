import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

import { isAuthed } from '@/shared/utils/auth';

export const GuestRoutes = ({ children }: { children: ReactNode }) => {
  if (isAuthed()) return <Navigate to={'/'} replace />;

  return children;
};