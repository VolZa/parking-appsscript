/**
 * Логування повідомлень у прихований аркуш "Логи"
 */
export function logToSheet(message: string): void {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = 'Логи';
    let logSheet = ss.getSheetByName(sheetName);
  
    if (!logSheet) {
      logSheet = ss.insertSheet(sheetName);
      logSheet.hideSheet(); // приховати
      logSheet.appendRow(['Час', 'Повідомлення']);
    }
  
    logSheet.appendRow([new Date(), message]);
  }
  
  export function clearLogs(): void {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Логи');
    if (sheet) sheet.clearContents().appendRow(['Час', 'Повідомлення']);
  }
  