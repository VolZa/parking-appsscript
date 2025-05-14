import { getDateFromList } from "../../services/calendars/getDateFromSheet";

export function setPerMonthToSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet,
    rangeSet: string): void 
{
const currentDate = getDateFromList(sheet);
const rangeHead = sheet.getRange(rangeSet);
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long'}; //short
const strDateHead = currentDate.toLocaleDateString('uk-UA', options);
rangeHead.setValue(`на ${strDateHead}`);
}