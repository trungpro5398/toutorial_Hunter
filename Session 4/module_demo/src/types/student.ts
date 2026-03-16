export interface Student {
  id: number;
  name: string;
  scores: number[];
}

export interface StudentReport {
  id: number;
  name: string;
  average: number;
  passed: boolean;
}
