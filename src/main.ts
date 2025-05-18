import { getDateFromList } from './services/calendars/getDateFromSheet';
import { formatDatesToSheet } from './services/calendars/formatDates';
import { writeDatesToSheet } from './services/calendars/writeDates';
import { setPerMonthToSheet } from './main/shedule/setPerMonthToSheet';
import { setCalendarToSheet } from './main/shedule/setCalendarToSheet';

import { createShedule } from './main/shedule/createShedule';
import { handleEdit } from './triggers/onEdit';

function setSheetShedule(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
  const startDateForRow = getDateFromList(sheet);
  setPerMonthToSheet(sheet, "B2:AC2");
  setCalendarToSheet(sheet);
  // writeDatesToSheet(sheet, "B3", startDateForRow, 31);
  createShedule();
}

function setSheetsAccounting(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
  setPerMonthToSheet(sheet, "B2:AG2");
}

function ins_row(sheet:GoogleAppsScript.Spreadsheet.Sheet): void {
  sheet.insertRowsBefore(2, 1);
  sheet.getRange("G3").copyTo(sheet.getRange("G2"), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
  sheet.getRange("H3").copyTo(sheet.getRange("H2"), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
}

(globalThis as any).setPerMonthToSheet = setPerMonthToSheet;
(globalThis as any).setCalendarToSheet = setCalendarToSheet;
(globalThis as any).createShedule = createShedule;

(globalThis as any).writeDatesToSheet = writeDatesToSheet;
(globalThis as any).formatDatesToSheet = formatDatesToSheet;
(globalThis as any).getDateFromList = getDateFromList;

(globalThis as any).setSheetShedule = setSheetShedule;
(globalThis as any).setSheetsAccounting = setSheetsAccounting;

(globalThis as any).handleEdit = handleEdit;

(globalThis as any).ins_row = ins_row;

