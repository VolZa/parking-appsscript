export function formatDatesToSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet,
    startCell: string,
    count: number
  ) {
    const range = sheet.getRange(startCell);
    const row = range.getRow();
    const column = range.getColumn();
    for (var i = 0; i < count; i += 1) {
      var date: Date = new Date();
      var cell = sheet.getRange(row, column + i);
      date = cell.getValue();
     ;
      
      // Встановлюємо колір тексту залежно від дня тижня
      var day = date.getDay();
      if (day == 6) { // Субота
        cell.setFontColor('blue');
      } else if (day == 0) { // Неділя
        cell.setFontColor('red');
      } else { // Інші дні
        cell.setFontColor('black');
      }
    }
  }