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