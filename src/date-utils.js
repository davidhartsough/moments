const dayOptions = {
  timeZone: "UTC",
  weekday: "long",
  month: "short",
  day: "numeric"
};
export function getDayString(date) {
  return new Date(date).toLocaleDateString(undefined, dayOptions);
}
const dateOptions = {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
  year: "numeric"
};
export function getDateString(date) {
  return new Date(date).toLocaleDateString(undefined, dateOptions);
}

// For Calendar and MonthPicker
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const date = new Date();
const currentMonthNumber = date.getMonth() + 1;
const currentYear = date.getFullYear();
const pad = n => (n < 10 ? `0${n}` : n);
const currentMonth = pad(currentMonthNumber);
const _monthOptions = months
  .slice(0, currentMonthNumber)
  .map((m, i) => ({
    value: `${currentYear}-${pad(i + 1)}`,
    label: `${m} ${currentYear}`
  }))
  .reverse();
for (let year = currentYear - 1; year >= 2019; year--) {
  for (let i = 11; i >= 0; i--) {
    _monthOptions.push({
      value: `${year}-${pad(i + 1)}`,
      label: `${months[i]} ${year}`
    });
  }
}
export const monthOptions = _monthOptions;
export const prevMonthBound = _monthOptions.length - 1;
export const currentYearAndMonth = `${currentYear}-${currentMonth}`;

// For Form
function getToday() {
  const d = new Date();
  const s = `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  return new Date(s);
}
function getTodayISO() {
  return toISO(getToday());
}
function toISO(date) {
  return date.toISOString().substr(0, 10);
}
export const todayISO = getTodayISO();
