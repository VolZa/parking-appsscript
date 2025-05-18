import { writeDatesToSheet } from '../../services/calendars/writeDates';
import { getDateFromList } from '../../services/calendars/getDateFromSheet';
//В шапку вношу Календар
export function setCalendarToSheet(sheet:GoogleAppsScript.Spreadsheet.Sheet) {
    const startDateForRow = getDateFromList(sheet);
    // Очищення рядка 1
    sheet.getRange(3, 2, 1, 31).clearContent();
    // console.log('startDateForRow = ' + startDateForRow);
    
    // Заповнення днів місяця
    writeDatesToSheet(sheet,"B3", startDateForRow, 31); //lastDayOfMonth (startDateForRow)
};
  
