'use client';

import { useMemo } from 'react';

import { useAuthContext } from './use-auth-context';

// Define base type for access roles
type AccessRole = {
  [K: string]: string | string[];
};

// Create mapped type for the return type based on input keys
type PermissionResult<T extends AccessRole> = {
  [K in keyof T]: boolean;
};
export function useCheckPermission<T extends AccessRole>(accessRole: T): PermissionResult<T> {
  const { permissions } = useAuthContext();

  const permissionsMap = useMemo(() => {
    const map = new Map<string, boolean>();
    permissions.forEach((permission) => {
      map.set(permission, true);
    });
    return map;
  }, [permissions]);

  const result = useMemo(() => {
    const permissionKeys = Object.keys(accessRole);

    return permissionKeys.reduce((acc, key: keyof T) => {
      acc[key] = Array.isArray(accessRole[key])
        ? accessRole[key].some((role) => permissionsMap.has(role))
        : permissionsMap.has(accessRole[key]);

      return acc;
    }, {} as PermissionResult<T>);
  }, [accessRole, permissionsMap]);

  return result;
}
