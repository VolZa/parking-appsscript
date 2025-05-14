import { setPerMonthToSheet, setCalendarToSheet, formatShiftSchedule } from './schedule';
import { genCalendarRow,  writeDatesToSheet} from './calendar';

function setHeadShiftShedule(sheet:GoogleAppsScript.Spreadsheet.Sheet): void {
  setPerMonthToSheet(sheet);
  setCalendarToSheet(sheet);
  formatShiftSchedule(sheet);
}

function ins_row(sheet:GoogleAppsScript.Spreadsheet.Sheet): void {
  // const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.insertRowsBefore(2, 1);
  sheet.getRange("G3").copyTo(sheet.getRange("G2"), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  sheet.getRange("H3").copyTo(sheet.getRange("H2"), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
}


(globalThis as any).setPerMonthToSheet = setPerMonthToSheet;
(globalThis as any).setCalendarToSheet = setCalendarToSheet;
(globalThis as any).formatShiftSchedule = formatShiftSchedule;

(globalThis as any).genCalendarRow = genCalendarRow;
(globalThis as any).writeDatesToSheet = writeDatesToSheet;

(globalThis as any).setHeadShiftShedule = setHeadShiftShedule;
(globalThis as any).ins_row = ins_row;