import { findRowByDate } from '../sheets/findRowByDate';

export function createListOfEmployees(sheetShedule: GoogleAppsScript.Spreadsheet.Sheet,
    sheet_TimeSheet: GoogleAppsScript.Spreadsheet.Sheet,
    shteet_Person: GoogleAppsScript.Spreadsheet.Sheet,
    firstDayOfMonth: Date) {
    const firstThreeEmployees = getFirstThreeEmployees(firstDayOfMonth, sheet_TimeSheet);
    const rawData = shteet_Person.getRange('H2:H5').getValues();
    const allEmployees = rawData.flat();
    const fourthEmployee = allEmployees.filter(emp => !firstThreeEmployees.includes(emp))[0];
    return firstThreeEmployees.concat(fourthEmployee);
}
  
export function setEmployeesToSheduleHead(sheetShedule: GoogleAppsScript.Spreadsheet.Sheet,
    finalEmployees: string[]) {
    for (let i = 0; i < finalEmployees.length; i++) {
      sheetShedule.getRange(`A${4 + i}`).setValue(finalEmployees[i]);
    }
}
  
function getFirstThreeEmployees(firstDayToSearch: Date, sheet: GoogleAppsScript.Spreadsheet.Sheet) {
const firstThreeEmployees = [];
for (let i = 0; i < 3; i+=1) {
    const dateToSearch = new Date(firstDayToSearch);
    dateToSearch.setDate(firstDayToSearch.getDate() + i);
    const rowIndex = findRowByDate(sheet, dateToSearch);
    if (rowIndex !== -1) {
    const employee = sheet.getRange(rowIndex, 6).getValue();
    firstThreeEmployees.push(employee);
    }
}
return firstThreeEmployees;
}
  