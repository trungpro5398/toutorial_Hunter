import { sampleStudents } from "./data/students.ts";
import buildStudentReports from "./services/report.service.ts";
import formatReportLine from "./utils/format.ts";

function main(): void {
  const reports = buildStudentReports(sampleStudents);

  console.log("Student Reports");
  console.log("----------------");

  for (const report of reports) {
    console.log(formatReportLine(report));
  }
}

main();
