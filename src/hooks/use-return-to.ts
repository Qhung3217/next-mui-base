'use client';

import { useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';
import { PERMISSIONS } from 'src/constants';
import { navData } from 'src/features/dashboard';
import { useAuthContext } from 'src/features/auth';

export const useReturnTo = (returnToDefault: string = CONFIG.auth.redirectPath) => {
  const { permissions } = useAuthContext();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const returnTo = useMemo(() => {
    const returnToUrl = searchParams.get('returnTo') ?? returnToDefault;

    if (permissions.includes(PERMISSIONS.VIEW.SALE)) {
      return paths.sale.root;
    }

    if (permissions.includes(PERMISSIONS.VIEW.MANAGER)) {
      let firstViewHasPermission: string | null = null;
      navData.forEach((section) => {
        if (firstViewHasPermission) return;
        const permitSection = section.items.find((item) => {
          if (!item.allowedRoles) return true;

          return Array.isArray(item.allowedRoles)
            ? item.allowedRoles.some((role) => permissions.includes(role))
            : permissions.includes(item.allowedRoles);
        });
        firstViewHasPermission = permitSection?.path || null;
      });

      return firstViewHasPermission ?? paths.manager.root;
    }

    if (returnToUrl) return returnToUrl;

    return CONFIG.auth.redirectPath;
  }, [permissions, searchParams, returnToDefault]);

  const createRedirectPath = (currentPath: string, to: string = pathname) => {
    const queryString = new URLSearchParams({ returnTo: to }).toString();
    return `${currentPath}?${queryString}`;
  };

  return { pathname, createRedirectPath, returnTo };
};
