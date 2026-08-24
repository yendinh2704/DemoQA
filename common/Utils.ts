
import { parse } from "csv-parse/sync";
import * as fs from "fs";
export function readDataFromCSV(filePath: string): Record<string, string>[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");

  const parsedRows = parse(content, {
    columns: true, // first line is header
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true, // allow rows with unexpected field counts
  }) as Array<Record<string, string | undefined>>;

  return parsedRows.map(
    (row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, value ?? ""]),
      ) as Record<string, string>,
  );
}

