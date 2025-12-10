import { isAuthed } from '@/shared/utils/auth';
import { type ReactNode } from 'react';
import { Navigate } from 'react-router';


export const PrivateRoutes = ({ children }: { children: ReactNode }) => {
  if (!isAuthed()) return <Navigate to={'/login'} replace />;

  return children;
};