export function  getDateFromList(sheet:GoogleAppsScript.Spreadsheet.Sheet): Date {
    const cellYear = sheet.getRange("A1");
    const cellMonth = sheet.getRange("A2");
    const year: number = cellYear.getValue();
    const month: number = cellMonth.getValue() - 1;
    
    const currentDate = new Date(year, month);
    return currentDate;
  }