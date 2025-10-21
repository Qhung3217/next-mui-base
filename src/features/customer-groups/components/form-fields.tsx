'use client';

import type { CustomerGroupSchemaType } from '../schemas';

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import useInputCurrency from 'src/hooks/use-input-currency';

import { ValueTypeLabel } from 'src/components/value-type';
import { Field, BlockField } from 'src/components/hook-form';

/* -------------------------------------------- */

type FormFieldBasicProps = {
  disabled?: boolean;
};

/* -------------------------------------------- */

// MARK: Name
/* -------------------------------------------- */
/*          CustomerGroupNameField               */
/* -------------------------------------------- */
export function CustomerGroupNameField({ disabled }: FormFieldBasicProps) {
  return (
    <BlockField label="Nhóm khách hàng" required>
      <Field.Text name="name" size="small" disabled={disabled} />
    </BlockField>
  );
}

// MARK: Discount
/* -------------------------------------------- */
/*          CustomerGroupDiscountField           */
/* -------------------------------------------- */

const DISCOUNT_TYPE_OPTIONS = [
  { label: 'Phần trăm (%)', value: 'PERCENT' },
  { label: 'Giá trị (đ)', value: 'VALUE' },
];

export default function CustomerGroupDiscountField({ disabled }: FormFieldBasicProps) {
  const {
    watch,
    setValue,
    formState: { dirtyFields },
  } = useFormContext<CustomerGroupSchemaType>();

  const [symbol, setSymbol] = useState<'%' | 'VNĐ'>('%');

  const discountValue = watch('discountValue');

  const discountType = watch('discountType');

  const isPercentDiscount = discountType === 'PERCENT';

  const { inputRef, displayValue, onChange, onKeyDown, onBlur, onFocus } = useInputCurrency(
    discountValue,
    {
      onBlur: (value) =>
        setValue('discountValue', value, {
          shouldValidate: true,
          shouldDirty: true,
        }),
      isBindingValue: true,
    }
  );

  useEffect(() => {
    if (discountType === 'PERCENT') {
      setSymbol('%');
    } else {
      setSymbol('VNĐ');
    }
  }, [discountType]);

  useEffect(() => {
    if (dirtyFields.discountType) {
      setValue('discountValue', '0', {
        shouldValidate: true,
      });
    }
  }, [discountType]);

  return (
    <BlockField label="Chiết khấu">
      <Field.RadioGroup name="discountType" options={DISCOUNT_TYPE_OPTIONS} row />

      <Field.Text
        name="discountValue"
        size="small"
        disabled={disabled}
        value={displayValue}
        onChange={onChange}
        inputRef={inputRef}
        onKeyDown={(e) => {
          onKeyDown(e);
        }}
        onBlur={onBlur}
        onFocus={onFocus}
        slotProps={{
          input: {
            endAdornment: <ValueTypeLabel type={symbol === '%' ? 'PERCENT' : 'VALUE'} />,
          },
        }}
      />
    </BlockField>
  );
}
