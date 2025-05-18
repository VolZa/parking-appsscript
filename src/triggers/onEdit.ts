import { createShedule } from "../main/shedule/createShedule";
import { setPerMonthToSheet } from "../main/shedule/setPerMonthToSheet";
import { getDateFromList } from "../services/calendars/getDateFromSheet";
import { writeDatesToSheet } from "../services/calendars/writeDates";

import { logToSheet } from "../services/logger";

/**
 * Обробляє редагування певної комірки.
 * @param {GoogleAppsScript.Events.SheetsOnEdit} e
 */
export function handleEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
    const sheet = e.range.getSheet();
    const cell = e.range.getA1Notation();
    const nameSheet: string = sheet.getName();
    Logger.log('Змінено А2 на листі ' + nameSheet);
    // Перевіряємо, чи змінилась комірка A2
    // і чи лист називається "Office"   
    if (cell === 'A2') {
      Logger.log('Бібліотека: змінено A1:A2 на ' + e.range.getValue());
      
        // Можете додати будь-яку логіку тут
        const startDateForRow: Date = getDateFromList(sheet);
        switch (nameSheet) {
            case 'Office':
            case 'Admin':
            case 'Other':
                setPerMonthToSheet(sheet, "B2:AG2");
                writeDatesToSheet(sheet, "C4", startDateForRow, 31); //lastDayOfMonth (startDateForRow)
                break;
            case 'Shedule':
                setPerMonthToSheet(sheet, "B2:AC2");
                writeDatesToSheet(sheet, "B3", startDateForRow, 31);
                try {
                    createShedule();
                } catch (err) {
                    
                  const errorMessage = 'Помилка в createShedule: ' + err;
                  Logger.log(errorMessage);
                  SpreadsheetApp.getActiveSpreadsheet().toast(errorMessage, 'ERROR');
                  logToSheet(errorMessage);
                  }
                  
                break;
        }
    
    }
}