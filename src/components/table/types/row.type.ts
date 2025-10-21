export type RowSelectedAction<T> = {
  icon: string;
  label: string;
  onClick: (rows: T[], close: () => void) => void;
};

export type RowAction = {
  inMenu?: boolean;
  icon: string;
  label: string;
  onClick: () => void;
  color: string;
};
