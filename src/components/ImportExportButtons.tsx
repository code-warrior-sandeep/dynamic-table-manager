'use client';
import React, { useRef } from 'react';
import { Button, Stack } from '@mui/material';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setRows } from '@/store/tableSlice';

const ImportExportButtons = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const { rows, visibleColumns } = useSelector((state: RootState) => state.table);

  // ✅ Handle CSV Import
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (!results.data || results.errors.length) {
          alert('Invalid CSV format');
          return;
        }

        // Add IDs if missing
        const parsedData = results.data.map((row: any, idx: number) => ({
          id: row.id || idx.toString(),
          ...row,
        }));

        dispatch(setRows(parsedData));
        alert('✅ CSV Imported Successfully');
      },
    });
  };

  // ✅ Handle CSV Export
  const handleExport = () => {
    if (rows.length === 0) {
      alert('No data to export!');
      return;
    }

    // Filter only visible columns
    const filtered = rows.map((row) => {
      const newRow: any = {};
      visibleColumns.forEach((col) => (newRow[col] = row[col]));
      return newRow;
    });

    const csv = Papa.unparse(filtered);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'data-export.csv');
  };

  return (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      {/* 🔽 Import Button */}
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
        Import CSV
      </Button>

      {/* 🔼 Export Button */}
      <Button variant="outlined" color="secondary" onClick={handleExport}>
        Export CSV
      </Button>
    </Stack>
  );
};

export default ImportExportButtons;
