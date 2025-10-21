export type FilterOption = {
  label: string;
  value: string;
};

export type FilterRoot = {
  label: string;
  inMenu?: boolean;
  filterKey: string;
};

export type FilterType = FilterSelectMulti | FilterSelectSingle | FilterDateRange;

/* -------------------------------------------- */
/*                    SELECT                    */
/* -------------------------------------------- */
export type FilterSelectBase = FilterRoot & {
  type: 'select';
  options: FilterOption[];
};

export type FilterSelectMulti = FilterSelectBase & {
  multiple: true;
};

export type FilterSelectSingle = FilterSelectBase & {
  multiple: false;
};

/* -------------------------------------------- */
/*                  DATE RANGE                  */
/* -------------------------------------------- */

export type DateRange = {
  from: string;
  to: string;
} | null;

export type FilterDateRange = FilterRoot & {
  type: 'date-range';
};
