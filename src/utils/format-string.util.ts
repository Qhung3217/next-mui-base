export function removeAccentedCharacter(str: string) {
  return str
    .normalize('NFD') // Phân tách ký tự và dấu
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D'); // Thay đ/Đ
}

export function limitCharacters(str: string, maxLength: number = 50) {
  if (str.length > maxLength) return `${str.slice(0, maxLength - 3)}..${str.slice(str.length - 3)}`;

  return str;
}
