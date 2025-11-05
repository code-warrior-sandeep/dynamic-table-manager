import Papa from 'papaparse';

export const importFromCsv = (
  file: File,
  callback: (data: any[]) => void
) => {
  Papa.parse(file, {
    header: true, // first row as keys
    skipEmptyLines: true,
    complete: (results) => {
      callback(results.data);
    },
  });
};