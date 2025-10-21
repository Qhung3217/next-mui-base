'use client';

import type { ReactNode, RefObject } from 'react';
import type { FadeProps } from '@mui/material/Fade';
import type { PopperProps } from '@mui/material/Popper';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import type { Option } from './type';

import { useEffect } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import useArrowNavigation from 'src/hooks/use-arrow-navigation';

import { Iconify } from '../iconify';
import { Scrollbar } from '../scrollbar';
import useSearchbar from './use-searchbar';
import { LoadingSpinner } from '../loading';
import { SearchNotFound } from '../search-not-found';

export type SearchbarProps<T> = {
  onSelect: (value: Option<T> | null) => void;
  onKeywordChange: (value: string) => void;
  loading?: boolean;
  options: Option<T>[];
  selected: Option<T> | null;
  permission?: {
    CAN_CREATE: boolean;
  };
  slotProps?: {
    input?: OutlinedInputProps & {
      onBeforeClick?: () => void;
      hideActionBefore?: boolean;
      iconBefore?: string;
    };
    popper?: Omit<PopperProps, 'children' | 'open'>;
    fade?: FadeProps;
  };
  slots: {
    item: (props: {
      option: Option<T>;
      refs: RefObject<(HTMLLIElement | null)[]>;
      index: number;
      isSelected: boolean;
      onChange: (value: Option<T> | null, index: number) => void;
    }) => ReactNode;
  };
};
export default function Searchbar<T>({
  loading,
  onSelect,
  onKeywordChange,
  selected,
  options,
  slotProps,
  slots,
  permission,
}: SearchbarProps<T>) {
  const { onBeforeClick, hideActionBefore, iconBefore, ...inputProps } = slotProps?.input || {};

  const CAN_CREATE = permission?.CAN_CREATE !== undefined ? permission.CAN_CREATE : true;

  const isEmpty = !options.length;

  const showSuggest = usePopover();

  const {
    rawKeyword,
    handleInputChange,
    inputRef,
    keyword,
    onChange,
    updateLocalState,
    resetState,
  } = useSearchbar<T>({
    onSelect,
    onReset: () => {
      onSelect(null);
      showSuggest.onClose();
    },
  });

  const { handleKeyDown, scrollableNodeRef, menuItemRefs, selectedIndex, setSelectedIndex } =
    useArrowNavigation({
      onSelect: (index: number) => {
        if (index < 0) {
          inputRef.current?.click();
        } else {
          const optionSelected = options[index];

          onLocalChange(optionSelected, index);
        }
      },
      onEscape: () => {
        showSuggest.onClose();
      },
      dataLength: options.length,
      disabledArrowKey: !options.length || !showSuggest.open,
    });

  const onLocalChange = (value: Option<T> | null, index: number) => {
    onChange(value, index);
    showSuggest.onClose();
  };

  const handleInputBlur = () => {
    updateLocalState(selected);
  };
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    showSuggest.onOpen(event);

    if (!selected) {
      setSelectedIndex(-1);
      return;
    }
    const indexSelected = options.findIndex((option) => option.id === selected.id);
    if (indexSelected >= 0) {
      setTimeout(() => {
        setSelectedIndex(indexSelected);
      }, 100);
    }
  };

  useEffect(() => {
    updateLocalState(selected);
  }, [selected]);

  useEffect(() => {
    onKeywordChange(keyword);
  }, [keyword]);

  return (
    <ClickAwayListener onClickAway={showSuggest.onClose}>
      <Box sx={{ position: 'relative' }}>
        <OutlinedInput
          ref={inputRef}
          onClick={handleInputClick}
          value={rawKeyword}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          endAdornment={
            (!hideActionBefore || rawKeyword) && (
              <IconButton
                size="small"
                onClick={(event) => {
                  event.stopPropagation();

                  if (!CAN_CREATE || rawKeyword) {
                    resetState();
                  } else {
                    onBeforeClick?.();
                    showSuggest.onClose();
                  }
                }}
              >
                <Iconify
                  icon={!CAN_CREATE || rawKeyword ? 'lucide:x' : iconBefore || 'lucide:plus'}
                />
              </IconButton>
            )
          }
          {...inputProps}
        />

        <Popper
          open={showSuggest.open && !!keyword}
          anchorEl={showSuggest.anchorEl}
          placement="bottom-start"
          disablePortal
          transition
          keepMounted
          {...slotProps?.popper}
          sx={{
            width: showSuggest.anchorEl ? showSuggest.anchorEl.clientWidth : 0,
            boxShadow: (theme) => theme.shadows[4],
            borderRadius: 1.5,
            zIndex: 1,
            backgroundColor: 'white',
            ...slotProps?.popper?.sx,
          }}
        >
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              style={{
                transformOrigin: 'top center',
              }}
              timeout={0}
              {...slotProps?.fade}
            >
              <Box>
                {loading && <LoadingSpinner size={30} sx={{ minHeight: 0, my: 2 }} />}
                {!loading && isEmpty && <SearchNotFound query={rawKeyword} sx={{ py: 1 }} />}
                {!loading && !isEmpty && (
                  <Scrollbar
                    scrollableNodeProps={{ ref: scrollableNodeRef }}
                    sx={{
                      p: 0.5,
                      minHeight: 0,
                      maxHeight: 400,
                    }}
                  >
                    {options.map((option, index) =>
                      slots.item({
                        index,
                        option,
                        refs: menuItemRefs,
                        isSelected: selectedIndex === index,
                        onChange: onLocalChange,
                      })
                    )}
                  </Scrollbar>
                )}
              </Box>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
