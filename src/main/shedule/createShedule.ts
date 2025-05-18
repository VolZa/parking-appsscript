// import { getDateFromList } from '../services/calendars/getDateFromSheet';
import { daysInMonth } from '../../utils/calendars/daysInMonth';
// import { writeDatesToSheet } from '../services/calendars/writeDates';
import { getSheet } from '../../services/sheets/getSheetByName';
// import { findRowByDate } from '../services/sheets/findRowByDate';
import { createListOfEmployees } from '../../services/schedule/employeeList';
import { setEmployeesToSheduleHead } from '../../services/schedule/employeeList';
import { getCarrentListFourNextEmployees } from '../../services/schedule/getCurrentList';

export function createShedule(): void {
  const tableListsAP: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetShedule:GoogleAppsScript.Spreadsheet.Sheet = getSheet(tableListsAP,'Shedule');
  // const url = 'https://docs.google.com/spreadsheets/d/1geI9mS5ue2vCBp9qYFhlxXXIr6KGNcTmU7RrX3TNkpc/edit';
  // const spreadsheetDB = SpreadsheetApp.openByUrl(url);
  // const spreadsheetDB = SpreadsheetApp.openById('1geI9mS5ue2vCBp9qYFhlxXXIr6KGNcTmU7RrX3TNkpc');
  const sheet_TimeSheet = getSheet(tableListsAP, 'dTimeSheet');
  const shteet_Person = getSheet(tableListsAP, 'dPerson');
  
  const rangeCalendar = sheetShedule.getRange('B3:AF3');
  const rangeFills = sheetShedule.getRange('B4:AF7');
  const dates = rangeCalendar.getValues()[0];
  const firstDayOfMonth = new Date(dates[0]);
  const daysWorked = [0, 0, 0, 0];
  const month = sheetShedule.getRange('AG2').getValue();
  const daysInMonthNum = daysInMonth(month);
  const listOfEmployeeForShedule = createListOfEmployees(sheetShedule, sheet_TimeSheet, shteet_Person, firstDayOfMonth);
    
  setEmployeesToSheduleHead(sheetShedule, listOfEmployeeForShedule);
  
  for (let col = 0; col < dates.length; col++) {
    const date = new Date(dates[col]);
    const dayOfWeek = date.getDay();
    let backgroundColor = '';

    if (dayOfWeek === 0) {
      backgroundColor = '#f4cccc';
    } else if (dayOfWeek === 6) {
      backgroundColor = '#d0e0e3';
    } else {
      backgroundColor = '#d3d3d3';
    }

    const currentDayEmployees = getCarrentListFourNextEmployees(sheet_TimeSheet, date);
    for (let row = 0; row < listOfEmployeeForShedule.length; row++) {
      const employee = listOfEmployeeForShedule[row];
      const cellFill = rangeFills.getCell(row + 1, col + 1);
      const employeeIndex = currentDayEmployees.indexOf(employee);
      if (employeeIndex !== -1) {
        if (employeeIndex === 0) {
          cellFill.setBackground(backgroundColor);
          if (col < daysInMonthNum) daysWorked[row] += 1;
        } else {
          cellFill.setBackground(null);
        }
      } else {
        cellFill.setBackground('#fff2cc');
      }
    }
  }
  
  for (let i = 0; i < daysWorked.length; i++) {
    sheetShedule.getRange(`AG${4 + i}`).setValue(daysWorked[i]);
  }
}
  