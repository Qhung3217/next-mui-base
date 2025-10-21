'use client';

export default function useCheckIOS() {
  return /iPad|iPhone|iPod|iOS|safari|MAC OS/i.test(navigator.userAgent);
}
