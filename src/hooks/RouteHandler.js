'use client';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

function RouteHandler() {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      if (user?.role === 'Professional') {
        if (pathname === '/job-offers') {
          router.push('/');
        }
      } else if (user?.role === 'Company') {
        if (pathname === '/') {
          router.push('/job-offers');
        }
      }
    } else {
      if (
        pathname !== '/sign-in' &&
        pathname !== '/sign-up' &&
        pathname !== '/sign-up/complete-info' &&
        pathname !== '/sign-up-company'
      ) {
        router.push('/');
      }
    }
  }, [user, pathname]);

  return null;
}

export default RouteHandler;
