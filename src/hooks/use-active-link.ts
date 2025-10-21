import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

interface UseActiveLinkOptions {
  exact?: boolean;
  includeHash?: boolean;
  includeSearch?: boolean;
}

export const useActiveLink = (
  path: string | string[],
  options: UseActiveLinkOptions = {}
): boolean => {
  const pathname = usePathname();
  const { exact = false, includeHash = false, includeSearch = false } = options;

  return useMemo(() => {
    const paths = Array.isArray(path) ? path : [path];

    return paths.some((currentPath) => {
      let locationPath = pathname;
      let targetPath = currentPath;

      // Xử lý hash
      if (!includeHash) {
        locationPath = locationPath.split('#')[0];
        targetPath = targetPath.split('#')[0];
      }

      // Xử lý query params
      if (!includeSearch) {
        locationPath = locationPath.split('?')[0];
        targetPath = targetPath.split('?')[0];
      }

      if (exact) {
        return locationPath === targetPath;
      }

      return (
        locationPath === targetPath ||
        (locationPath.startsWith(targetPath) &&
          (locationPath.length === targetPath.length || locationPath[targetPath.length] === '/'))
      );
    });
  }, [pathname, path, exact, includeHash, includeSearch]);
};
