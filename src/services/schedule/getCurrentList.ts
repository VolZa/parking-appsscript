import { findRowByDate } from '../sheets/findRowByDate';

export function getCarrentListFourNextEmployees(sheet_TimeSheet: GoogleAppsScript.Spreadsheet.Sheet, date: Date): string[] {
  const rowIndex = findRowByDate(sheet_TimeSheet, date);
  const employees = sheet_TimeSheet.getRange(rowIndex - 3, 6, 4, 1).getValues().map(row => row[0]);
  return employees.reverse();
}