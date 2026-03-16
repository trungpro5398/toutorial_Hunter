import type { StudentReport } from "../types/student.ts";

export function formatAverage(value: number): string {
  return value.toFixed(2);
}

export default function formatReportLine(report: StudentReport): string {
  const status = report.passed ? "PASS" : "FAIL";
  return `${report.name} | average=${formatAverage(report.average)} | ${status}`;
}
