export type DayStatus = 'blank' | 'completed' | 'missed';

export interface DaySquareProps {
  date: Date;
}

export interface WeekRowProps {
  dates: Date[];
}

export interface YearGridProps {
  year: number;
} 