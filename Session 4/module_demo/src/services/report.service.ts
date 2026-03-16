import type { Student, StudentReport } from "../types/student.ts";
import { average, hasPassed } from "../utils/score.ts";

export default function buildStudentReports(students: Student[]): StudentReport[] {
  return students.map((student) => {
    const avg = average(student.scores);

    return {
      id: student.id,
      name: student.name,
      average: avg,
      passed: hasPassed(avg),
    };
  });
}
