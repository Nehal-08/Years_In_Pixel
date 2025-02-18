export const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const generateWeekDates = (startDate: Date): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate.getTime()); // Create a new Date instance
    date.setDate(startDate.getDate() + i);
    date.setHours(0, 0, 0, 0);
    dates.push(date);
  }
  return dates;
};

export const generateYearDates = (): Date[] => {
  const dates: Date[] = [];
  const currentYear = new Date().getFullYear(); // Get the current year

  // Start from Jan 1 of the current year
  const startDate = new Date(currentYear, 0, 1);
  startDate.setHours(0, 0, 0, 0);

  // End at Dec 31 of the current year
  const endDate = new Date(currentYear, 11, 31);
  endDate.setHours(0, 0, 0, 0);

  // Generate all dates within the year
  const currentDate = new Date(startDate);
  while (currentDate.getTime() <= endDate.getTime()) {
    dates.push(new Date(currentDate)); // Push a new instance to avoid mutation
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const isDatePassed = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const compareDate = new Date(date.getTime());
  compareDate.setHours(0, 0, 0, 0);

  return compareDate.getTime() < today.getTime();
};
