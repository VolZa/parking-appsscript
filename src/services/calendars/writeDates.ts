/**
* На листі sheet у вказаній клітинці startCell
* записує дати, починаючи з startDate.
* count - кількість днів, які потрібно записати.
 */
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