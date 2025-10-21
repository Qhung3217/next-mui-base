'use client';

import { useRef, useState, useEffect } from 'react';
/* -------------------------------------------- */
const Y_SPACING_ITEM = 120;
/* -------------------------------------------- */

type Props = {
  onSelect: (index: number, event: React.KeyboardEvent<HTMLInputElement>) => void;
  onEscape: () => void;
  dataLength: number;
  disabledArrowKey?: boolean;
  ySpacingItem?: number;
  disabledScrollAfterSelect?: boolean;
};
export default function useArrowNavigation({
  onSelect,
  onEscape,
  dataLength,
  disabledArrowKey,
  ySpacingItem = Y_SPACING_ITEM,
  disabledScrollAfterSelect,
}: Props) {
  const menuItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const scrollableNodeRef = useRef<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    // Cuộn đến option được chọn
    if (selectedIndex >= 0 && menuItemRefs.current[selectedIndex] && scrollableNodeRef.current) {
      const menuItem = menuItemRefs.current[selectedIndex];
      const scrollContainer = scrollableNodeRef.current;
      if (menuItem) {
        const itemRect = menuItem.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();
        const scrollTop = scrollContainer.scrollTop;
        const itemTop = menuItem.offsetTop;
        const itemBottom = itemTop + itemRect.height;
        const containerHeight = containerRect.height;

        // Cuộn nếu item nằm ngoài vùng nhìn thấy
        if (itemTop < scrollTop) {
          scrollContainer.scrollTo({ top: itemTop - ySpacingItem, behavior: 'smooth' });
        } else if (itemBottom > scrollTop + containerHeight) {
          scrollContainer.scrollTo({
            top: itemBottom - containerHeight + ySpacingItem,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    // Reset selectedIndex khi danh sách thay đổi
    reset();
  }, [dataLength]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (disabledArrowKey) return;
        setSelectedIndex((prev) => (prev + 1) % dataLength);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (disabledArrowKey) return;
        setSelectedIndex((prev) => (prev - 1 + dataLength) % dataLength);
        break;
      case 'Enter':
        onSelect(selectedIndex, event);
        if (selectedIndex >= 0 && !disabledScrollAfterSelect) {
          setSelectedIndex(-1);
        }
        if (scrollableNodeRef.current && !disabledScrollAfterSelect) {
          scrollableNodeRef.current.scrollTo({ top: 0 });
        }
        break;
      case 'Escape':
        onEscape();
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  const reset = () => {
    menuItemRefs.current = [];
    setSelectedIndex(-1);
    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.scrollTo({ top: 0 });
    }
  };

  return {
    handleKeyDown,
    reset,
    selectedIndex,
    menuItemRefs,
    scrollableNodeRef,
    setSelectedIndex,
  };
}
