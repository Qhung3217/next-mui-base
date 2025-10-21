// ----------------------------------------------------------------------

/*
 * Locales code
 * https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */

export type InputNumberValue = string | number | null | undefined;

type Options = Intl.NumberFormatOptions;

const DEFAULT_LOCALE = { code: 'vi-VN', currency: 'VND' };

function processInput(inputValue: InputNumberValue): number | null {
  if (inputValue == null) return null;

  const str = String(inputValue);

  // Xử lý trường hợp chỉ có dấu . hoặc ,
  if (str === '.' || str === ',') return 0;

  // Cho phép: số, dấu chấm, dấu phẩy, và dấu trừ (nếu cần số âm)
  const numStr = str
    .replace(/[^\d.,-]/g, '') // Giữ lại số, dấu chấm, phẩy và dấu trừ
    .replace(/,/g, '.'); // Thay thế tất cả dấu phẩy thành dấu chấm

  // Xử lý trường hợp có nhiều dấu chấm (chỉ giữ lại dấu chấm đầu tiên)
  const parts = numStr.split('.');
  let processedStr = parts[0];
  if (parts.length > 1) {
    processedStr += '.' + parts.slice(1).join('');
  }

  const num = Number(processedStr);

  return num;
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE;

  const number = processInput(inputValue);

  if (number === null) return '';

  const hasDecimal = number % 1 !== 0;

  const fm = new Intl.NumberFormat(locale.code, {
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrencyToNumber(currencyString: string) {
  // Loại bỏ ký tự tiền tệ và dấu phẩy, thay thế dấu chấm thành dấu phẩy nếu cần
  const numberString = currencyString
    .replace(/[^\d,-]/g, '') // Giữ lại chỉ số, dấu phẩy, dấu trừ
    .replace(/\./g, '') // Loại bỏ dấu chấm (nếu dùng làm phân cách nghìn)
    .replace(/,/g, '.'); // Chuyển dấu phẩy thành dấu chấm cho số thập phân

  return parseFloat(numberString) || 0;
}
// ----------------------------------------------------------------------

export function fCurrency(
  inputValue: InputNumberValue,
  options: Options & {
    showSymbol?: boolean;
  } = { showSymbol: false }
) {
  const { showSymbol, ...intlOptions } = options || {};
  const locale = DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return '';

  const hasDecimal = number % 1 !== 0;

  const fm = new Intl.NumberFormat(locale.code, {
    style: 'currency',
    currency: locale.currency,
    minimumFractionDigits: hasDecimal ? 2 : 0,
    maximumFractionDigits: 2,
    ...intlOptions,
  }).format(number);

  if (showSymbol) return fm.trim();

  return fm.replace(/đ/g, '').replace(/₫/g, '').trim();
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return '';

  const fm = new Intl.NumberFormat(locale.code, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputNumberValue, options?: Options) {
  const locale = DEFAULT_LOCALE;

  const number = processInput(inputValue);
  if (number === null) return '';

  const fm = new Intl.NumberFormat(locale.code, {
    notation: 'compact',
    maximumFractionDigits: 2,
    ...options,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputNumberValue) {
  const number = processInput(inputValue);
  if (number === null || number === 0) return '0 bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];
  const decimal = 2;
  const baseValue = 1024;

  const index = Math.floor(Math.log(number) / Math.log(baseValue));
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}

// ----------------------------------------------------------------------

export function fParseNumber(inputValue: InputNumberValue): number {
  const number = processInput(inputValue);

  if (number == null) return 0;

  return Number(number.toFixed(3));
}
