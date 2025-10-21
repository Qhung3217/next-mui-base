import * as z from 'zod';
import dayjs from 'dayjs';

/**
 * Support phone number in Vietnam
 * Viettel: 032, 033, 034, 035, 036, 037, 038, 039, 086, 096, 097, 098
 * MobiFone: 070, 076, 077, 078, 079, 089, 090, 093
 * Vinaphone: 081, 082, 083, 084, 085, 088, 091, 094
 * Vietnamobile: 092, 052, 056, 058
 * Gmobile: 099, 059
 * Itelecom: 087
 * Reddi (Wintel): 055
 */

const phoneRegex = /^0(3[2-9]|5[25689]|70|7[6-9]|8[1-9]|9[0-4]|9[6-9])\d{7}$/;
// ----------------------------------------------------------------------

type SchemaErrorMessages = {
  required?: string;
  invalid?: string;
};

export const schemaUtils = {
  /**
   * Currency
   * Apply for currency input.
   */
  currency: (props?: {
    error?: SchemaErrorMessages;
    isValid?: (val: string) => boolean;
    optional?: boolean;
  }) =>
    z.string().check((ctx) => {
      const val = ctx.value.trim();

      if (!props?.optional && !val) {
        ctx.issues.push({
          code: 'custom',
          message: props?.error?.required ?? 'Currency is required!',
          input: val,
        });
        return;
      }

      if (val) {
        const price = Number(val.replace(/./g, ''));

        if (Number.isNaN(price) || price < 0 || !Number.isInteger(price)) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.invalid ?? 'Currency is invalid!',
            input: val,
          });
          return;
        }
      }
    }),

  /**
   * Phone number
   * Apply for phone number input.
   */
  phoneNumber: (props?: {
    error?: SchemaErrorMessages;
    isValid?: (val: string) => boolean;
    optional?: boolean;
  }) =>
    z
      .string()
      .check((ctx) => {
        const val = ctx.value;
        if (!props?.optional && !val.trim()) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.required ?? 'Phone number is required!',
            input: val,
          });
          return;
        }

        if (val.trim() && !phoneRegex.test(val)) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.invalid ?? 'Invalid phone number!',
            input: val,
          });
          return;
        }
      })
      .max(20, { message: 'Tối đa 20 ký tự' }),
  /**
   * Email
   * Apply for email input.
   */
  email: (props?: { error?: SchemaErrorMessages; optional?: boolean }) =>
    z
      .string()
      .check((ctx) => {
        const val = ctx.value;
        if (!props?.optional && !val.trim()) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.required ?? 'Email is required!',
            input: val,
          });
          return;
        }

        if (val.trim() && z.email().safeParse(val).error) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.invalid ?? 'Email must be a valid email address!',
            input: val,
          });
          return;
        }
      })
      .max(100, { message: 'Tối đa 100 ký tự' }),
  /**
   * Date
   * Apply for date pickers.
   */
  date: (props?: { error?: SchemaErrorMessages }) =>
    z.preprocess(
      (val) => (val === undefined ? null : val), // Process input value before validation
      z.union([z.string(), z.number(), z.date(), z.null()]).check((ctx) => {
        const value = ctx.value;

        if (value === null || value === '') {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.required ?? 'Date is required!',
            input: value,
          });
          return;
        }

        if (!dayjs(value).isValid()) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error?.invalid ?? 'Invalid date!',
            input: value,
          });
        }
      })
    ),

  /**
   * Editor
   * Apply for editor
   */
  editor: (props?: { error?: string }) =>
    z.string().refine(
      (val) => {
        const cleanedValue = val.trim();
        return cleanedValue !== '' && cleanedValue !== '<p></p>';
      },
      { error: props?.error ?? 'Content is required!' }
    ),

  /**
   * Nullable Input
   * Apply for input, select... with null value.
   */
  nullableInput: <T extends z.ZodTypeAny>(schema: T, options?: { error?: string }) =>
    schema.nullable().refine((val) => val !== null && val !== undefined, {
      error: options?.error ?? 'Field is required!',
    }),

  /**
   * Boolean
   * Apply for checkbox, switch...
   */
  boolean: (props?: { error?: string }) =>
    z.boolean().refine((val) => val === true, {
      error: props?.error ?? 'Field is required!',
    }),

  /**
   * Slider range
   * Apply for slider with range [min, max].
   */
  sliderRange: (props: { error?: string; min: number; max: number }) =>
    z
      .number()
      .array()
      .refine((val) => val[0] >= props.min && val[1] <= props.max, {
        error: props.error ?? `Range must be between ${props.min} and ${props.max}`,
      }),

  /**
   * File
   * Apply for upload single file.
   */
  file: (props?: { error?: string; optional?: boolean }) =>
    z
      .file()
      .or(z.string())
      .or(z.null())
      .check((ctx) => {
        const value = ctx.value;
        if (!props?.optional && (!value || (typeof value === 'string' && !value.length))) {
          ctx.issues.push({
            code: 'custom',
            message: props?.error ?? 'File is required!',
            input: value,
          });
        }
      }),
  /**
   * Files
   * Apply for upload multiple files.
   */
  files: (props?: { error?: string; minFiles?: number }) =>
    z
      .array(z.union([z.string(), z.file()]))
      .min(props?.minFiles ?? 1, { error: props?.error ?? 'Files is required!' }),

  /**
   * Birthday
   * defaultValue === null
   */
  birthday: (props?: { error?: SchemaErrorMessages; optional?: boolean }) =>
    z.any().check((ctx) => {
      const val = ctx.value;
      if (!props?.optional && !val) {
        ctx.issues.push({
          code: 'custom',
          message: props?.error?.required ?? 'Birthday is required!',
          input: val,
        });
        return;
      }

      const date = new Date(val);
      if (!isNaN(date.getTime()) && date > new Date()) {
        ctx.issues.push({
          code: 'custom',
          message: props?.error?.invalid ?? 'Birthday must be a valid date!',
          input: val,
        });
        return;
      }
    }),
};

// ----------------------------------------------------------------------

/**
 * Test one or multiple values against a Zod schema.
 */
export function testCase<T extends z.ZodTypeAny>(schema: T, values: unknown[]) {
  const color = {
    green: (txt: string) => `\x1b[32m${txt}\x1b[0m`,
    red: (txt: string) => `\x1b[31m${txt}\x1b[0m`,
    gray: (txt: string) => `\x1b[90m${txt}\x1b[0m`,
  };

  values.forEach((value) => {
    const { data, success, error } = schema.safeParse(value);
    const type = color.gray(`(${typeof value})`);
    const serializedValue = JSON.stringify(value);

    const label = success
      ? color.green(`✅ Valid - ${serializedValue}`)
      : color.red(`❌ Error - ${serializedValue}`);
    const payload = success ? data : z.treeifyError(error);

    console.info(`${label} ${type}:`, JSON.stringify(payload, null, 2));
  });
}

// Example usage:
// testCase(schemaUtils.boolean(), [true, false, 'true', 'false', '', 1, 0, null, undefined]);

// testCase(schemaUtils.date(), [
//   '2025-04-10',
//   1712736000000,
//   new Date(),
//   '2025-02-30',
//   '04/10/2025',
//   'not-a-date',
//   '',
//   null,
//   undefined,
// ]);

// testCase(
//   schemaUtils.nullableInput(
//     z.coerce
//       .number()
//       .int()
//       .min(1, { error: 'Age is required!' })
//       .min(18, { error: 'Age must be between 18 and 80' })
//       .max(80, { error: 'Age must be between 18 and 80' }),
//     { error: 'Age is required!' }
//   ),
//   [2, '2', 18, '18', 79, '79', 81, '81', null, undefined]
// );
