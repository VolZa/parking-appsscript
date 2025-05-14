/**
 * Створює рядок дат від вказаного дня (рік, місяць, день) і довжиною count днів.
 *
 * @param {number} year Рік (наприклад, 2025)
 * @param {number} month Місяць (1–12)
 * @param {number} day День місяця (1–31)
 * @param {number} count Кількість днів для відображення
 * @return {Date[]} Масив дат у рядок
 * @customfunction
 */

export function genCalendarRow(year: number, month: number, day: number, count: number): Date[][] {
  const startDate: Date = new Date(year, month - 1, day);
  const result: Date[] = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime());
    date.setDate(startDate.getDate() + i);
    result.push(date);
  }

  return [result]; // Повертає рядок дат (один рядок, багато колонок)
}


// Визначаємо кількість днів у місяці за номером місяця. 
// Нумерація місяця починається з 1 до 12. 
// Параметр year використовується для лютого місяця щоб взнати чи високосний рік чи ні. 
// Якщо рік не було вказано тоді використовується теперішній рік.

export function daysInMonth(month: number, year?: number): number {
  if (!month) month = new Date().getMonth() + 1;
  switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
      return 31;
    case 4: case 6: case 9: case 11:
      return 30;
    case 2:
      const y = year ?? new Date().getFullYear();
      return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 29 : 28;
    default:
      throw new Error("Невірний номер місяця");
  }
}

export function writeDatesToSheet (
  sheet: GoogleAppsScript.Spreadsheet.Sheet,
  startCell: string,
  startDate: Date,
  count: number
) {
  const range = sheet.getRange(startCell);
  const row = range.getRow();
  const column = range.getColumn();

  for (var i = 0; i < count; i += 1) {
    var newDate = new Date(startDate.getTime());
    newDate.setDate(newDate.getDate() + i);
    var cell = sheet.getRange(row, column + i);
    cell.setValue(newDate);
    
    // Встановлюємо колір тексту залежно від дня тижня
    var day = newDate.getDay();
    if (day == 6) { // Субота
      cell.setFontColor('blue');
    } else if (day == 0) { // Неділя
      cell.setFontColor('red');
    } else { // Інші дні
      cell.setFontColor('black');
    }
  }
}
