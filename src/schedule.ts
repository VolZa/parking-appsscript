import { daysInMonth, writeDatesToSheet } from './calendar';

// Таблиця "DbParkingMyr" відкриваю за Id
const spreadsheetDB: GoogleAppsScript.Spreadsheet.Spreadsheet =
    SpreadsheetApp.openById('1geI9mS5ue2vCBp9qYFhlxXXIr6KGNcTmU7RrX3TNkpc');    

const sheet_TimeSheet: GoogleAppsScript.Spreadsheet.Sheet = getSheet(spreadsheetDB, "TimeSheet");
const shteet_Person: GoogleAppsScript.Spreadsheet.Sheet = getSheet(spreadsheetDB, "Person");

function getSheet(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
                  nameSheet: string): GoogleAppsScript.Spreadsheet.Sheet {
  const sheet = spreadsheet.getSheetByName(nameSheet);
  if (!sheet) {
    throw new Error(`Sheet "${nameSheet}" not found.`);
  }
  return sheet;
}

const getDateFromListShedule = function(sheetShedule:GoogleAppsScript.Spreadsheet.Sheet): Date {
  const cellYear = sheetShedule.getRange("AG1");
  const cellMonth = sheetShedule.getRange("AG2");
  const yearShedule = cellYear.getValue();
  const monthShedule = cellMonth.getValue() - 1;
  
  const currentDate = new Date(yearShedule, monthShedule);
  return currentDate;
}

export function setPerMonthToSheet (sheet:GoogleAppsScript.Spreadsheet.Sheet) {

  const currentDate = getDateFromListShedule(sheet);
  const rangeHead = sheet.getRange("A2:AF2");
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long'}; //short
  const strDateHead = currentDate.toLocaleDateString('uk-UA', options);
  rangeHead.setValue(`на ${strDateHead}`);
}

//В шапку вношу Календар
export function setCalendarToSheet(sheet:GoogleAppsScript.Spreadsheet.Sheet) {
  const startDateForRow = getDateFromListShedule(sheet);
  // const sheet = getSheet(spreadsheetAuto25, 'Shedule'); 
    // Очищення рядка 1
  sheet.getRange(3, 2, 1, 31).clearContent();
  console.log('startDateForRow = ' + startDateForRow);
  // Заповнення днів місяця

  writeDatesToSheet(sheet,"B3", startDateForRow, 31); //lastDayOfMonth (startDateForRow)
};

function getFirstThreeEmployees(
    firstDayToSearch: Date,
    sheet: GoogleAppsScript.Spreadsheet.Sheet
) {
  let firstThreeEmployees = [];
  for (let i = 0; i < 3; i++) {
    const dateToSearch = new Date(firstDayToSearch.getTime());
    dateToSearch.setDate(firstDayToSearch.getDate() + i); // Змінюємо день для 1, 2 та 3 числа
    
    // Шукаємо працівника на цей день в базі чергувань
    const rowIndex = findRowByDate(sheet, dateToSearch); // Функція для пошуку рядка за датою
    if (rowIndex !== -1) {
      const employeeOnDate = sheet.getRange(rowIndex, 6).getValue(); // Отримуємо працівника зі стовпця F
      firstThreeEmployees.push(employeeOnDate);
    }
  }
  return firstThreeEmployees;
}

//Створюю список працівників для шапки гафіка
function createListOfEmployees(
    sheetShedule: GoogleAppsScript.Spreadsheet.Sheet,
    sheet_TimeSheet: GoogleAppsScript.Spreadsheet.Sheet,
    shteet_Person: GoogleAppsScript.Spreadsheet.Sheet,
    firstDayOfMonth: Date
) {
  // Отримуємо працівників за 1, 2 та 3 число місяця з бази даних
  let firstThreeEmployees = [];
  firstThreeEmployees = getFirstThreeEmployees(firstDayOfMonth, sheet_TimeSheet);
    // Масив всіх працівників
    const rawData: string[][] = shteet_Person.getRange('H2:H5').getValues();  
    const allEmployees: string[] = rawData.reduce((acc, row) => acc.concat(row), []);
//   const allEmployees: string[] = (sheetShedule.getRange('A9:A12').getValues() as string[][]).flat();
 // Отримуємо всіх працівників з листа
  // Визначаємо четвертого працівника, який не потрапив до перших трьох
    //   const fourthEmployee = allEmployees.find(emp => !firstThreeEmployees.includes(emp));
    // const fourthEmployee = allEmployees.find(emp => firstThreeEmployees.indexOf(emp) === -1);
    const fourthEmployee = allEmployees.filter(emp => firstThreeEmployees.indexOf(emp) === -1)[0];


  // Формуємо масив працівників для графіку
  // const finalEmployees: string[] = [...firstThreeEmployees, fourthEmployee];
  const finalEmployees: string[] = firstThreeEmployees.concat(fourthEmployee);

  return finalEmployees;
}
//Вношу в шапку графіка список працівників
function setEmployeesToSheduleHead(sheetShedule: GoogleAppsScript.Spreadsheet.Sheet, finalEmployees: string[]) {
  for (let i = 0; i < finalEmployees.length; i++) {
    sheetShedule.getRange(`A${4 + i}`).setValue(finalEmployees[i]);
  }

}  

function findRowByDate(sheet: GoogleAppsScript.Spreadsheet.Sheet, date: Date): number {
  const dates = sheet.getRange('A2:A').getValues().map(row => new Date(row[0]));
  
//   const index = dates.findIndex(d => !isNaN(d.getTime()) && d.toDateString() === date.toDateString());
  
    for (let i = 0; i < dates.length; i +=1) {
        if (dates[i].getTime() === date.getTime()) {
            return i + 2; // +2 — бо починали з A2
        }
    }
    return -1; // Якщо не знайдено, повертаємо -1 
}
    
  


function getCarrentListFourNextEmployees(
    sheet_TimeSheet: GoogleAppsScript.Spreadsheet.Sheet,
    date: Date
) {
  const rowIndex = findRowByDate(sheet_TimeSheet, date); //Індекс рядка на певну дату
  const employees: string[] = (sheet_TimeSheet.getRange(rowIndex - 3, 6, 4, 1).getValues() as string[][]).map(row => row[0]);
  return employees.reverse(); // Виправляємо порядок на потрібний
}

export function formatShiftSchedule(sheetShedule: GoogleAppsScript.Spreadsheet.Sheet) {
  // Діапазон для календаря (рядок з датами)
  const rangeCalendar = sheetShedule.getRange('B3:AF3');
  const rangeFills = sheetShedule.getRange('B4:AF7'); // Діапазон для заливки чергувань
  const dates = rangeCalendar.getValues()[0]; // Отримуємо дати з календаря
  const firstDayOfMonth = new Date(dates[0]); // Перше число місяця (з B3)
  const daysWorked = [0, 0, 0, 0];
  const month: number = sheetShedule.getRange('AG2').getValue();
  const daysInMonthNum = daysInMonth(month);

  //Створюю список працівників для шапки графіка
  const listOfEmployeeForShedule = createListOfEmployees(sheetShedule, sheet_TimeSheet, shteet_Person, firstDayOfMonth);

  //Вношу в шапку графіка список працівників
  setEmployeesToSheduleHead(sheetShedule, listOfEmployeeForShedule);

  // Основна логіка заливки
  for (let col = 0; col < dates.length; col++) {
    const date = new Date(dates[col]);
    const dayOfWeek = date.getDay();
    let backgroundColor = '';

    if (dayOfWeek === 0) {
      backgroundColor = '#f4cccc'; // Неділя
    } else if (dayOfWeek === 6) {
      backgroundColor = '#d0e0e3'; // Субота
    } else {
      backgroundColor = '#d3d3d3'; // Будні
    }

    // Отримуємо дані про працівників на цю дату з бази даних
    const currentDayEmployees = getCarrentListFourNextEmployees(sheet_TimeSheet, date); //день тиждня
    // Logger.log('const currentDayEmployees ' + date.getDay() + '-' + currentDayEmployees);
    // Перевіряємо чергування для кожного працівника
   // let isVacation = false;
    for (let row = 0; row < listOfEmployeeForShedule.length; row++) {
      const employee = listOfEmployeeForShedule[row];
      const cellFill = rangeFills.getCell(row + 1, col + 1);
        const employeeIndex = currentDayEmployees.indexOf(employee);
        if (employeeIndex !== -1) {
            if (employeeIndex === 0) {
                cellFill.setBackground(backgroundColor); // Заливка чергового працівника
                if (col < daysInMonthNum) daysWorked[row] += 1; 
            } else {
                cellFill.setBackground(null); // Вихідний
            }
        } else {
            cellFill.setBackground('#fff2cc'); // Відпустка
        }

    //   if (currentDayEmployees.includes(employee)) {
    //     if (currentDayEmployees[0] === employee) {
    //       cellFill.setBackground(backgroundColor); // Заливка чергового працівника
    //       if (col < daysInMonthNum) daysWorked[row] += 1; 
    //     } else {
    //         cellFill.setBackground(null); // Вихідний
    //     }
    //   } else {

    //       cellFill.setBackground('#fff2cc'); // Відпустка
    //   }
    }
  }

  //вношу кількість відпрацьованих діб
    for (let i = 0; i < daysWorked.length; i++) {
    sheetShedule.getRange(`AG${4 + i}`).setValue(daysWorked[i]);
  }
}