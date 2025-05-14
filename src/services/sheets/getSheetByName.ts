export function getSheet(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
    nameSheet: string): GoogleAppsScript.Spreadsheet.Sheet {
const sheet = spreadsheet.getSheetByName(nameSheet);
if (!sheet) {
throw new Error(`Sheet "${nameSheet}" not found.`);
}
return sheet;
}