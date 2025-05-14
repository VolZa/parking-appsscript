export function findRowByDate(sheet: GoogleAppsScript.Spreadsheet.Sheet, date: Date): number {
    const dates = sheet.getRange('A2:A').getValues().map(row => new Date(row[0]));
    for (let i = 0; i < dates.length; i++) {
      if (dates[i].getTime() === date.getTime()) return i + 2;
    }
    return -1;
  }