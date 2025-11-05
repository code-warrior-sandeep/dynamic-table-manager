'use client';
import React, { useMemo, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination,
  TextField, TableSortLabel, Button, Stack,
  IconButton, Dialog, DialogTitle, DialogActions, Tooltip
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSort, setSearchTerm, setRows } from '@/store/tableSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const DataTable = () => {
  const dispatch = useDispatch();
  const { rows = [], visibleColumns = [], searchTerm = '', sortBy, sortOrder } =
    useSelector((state: RootState) => state.table || {});

  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [isEditing, setIsEditing] = useState(false);
  const [rowEditingId, setRowEditingId] = useState<string | null>(null);
  const [editedRows, setEditedRows] = useState<{ [key: string]: any }>({});
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // 🔍 Filter Rows
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    return rows.filter((row) =>
      visibleColumns.some((col) =>
        String(row[col]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [rows, searchTerm, visibleColumns]);

  // ↕ Sort Rows
  const sortedRows = useMemo(() => {
    if (!sortBy) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortBy, sortOrder]);

  // 📄 Pagination
  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page]);

  // ✏ Handle Edit
  const handleEditChange = (id: string, key: string, value: string) => {
    setEditedRows((prev) => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  // 💾 Save All
  const handleSave = () => {
    const updated = rows.map((row) => ({
      ...row,
      ...(editedRows[row.id] || {}),
    }));
    dispatch(setRows(updated));
    setIsEditing(false);
    setRowEditingId(null);
    setEditedRows({});
  };

  // ❌ Cancel All
  const handleCancel = () => {
    setIsEditing(false);
    setRowEditingId(null);
    setEditedRows({});
  };

  // 💾 Save Single Row
  const handleRowSave = (id: string) => {
    const updated = rows.map((row) =>
      row.id === id ? { ...row, ...(editedRows[id] || {}) } : row
    );
    dispatch(setRows(updated));
    setRowEditingId(null);
  };

  // ❌ Cancel Single Row
  const handleRowCancel = () => setRowEditingId(null);

  // 🗑 Delete Row
  const confirmDelete = (id: string) => setDeleteTarget(id);
  const handleDelete = () => {
    if (!deleteTarget) return;
    const updated = rows.filter((row) => row.id !== deleteTarget);
    dispatch(setRows(updated));
    setDeleteTarget(null);
  };

  return (
    <Paper className="p-6 md:p-8 rounded-2xl shadow-md bg-white mt-5">
      {/* Top Bar: Responsive Inline */}
      <div className="flex items-center justify-center gap-4 mb-6">
  {/* 🔍 Search Field */}
  <TextField
    label="Search..."
    variant="outlined"
    size="small"
    className="w-64"
    value={searchTerm}
    onChange={(e) => dispatch(setSearchTerm(e.target.value))}
  />

  {/* ✏ Edit Controls */}
  <Stack direction="row" spacing={3}>
    {!isEditing ? (
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsEditing(true)}
        disabled={rows.length === 0}
      >
        Edit All
      </Button>
    ) : (
      <>
        <Button
          variant="contained"
          color="success"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save All
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<CancelIcon />}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </>
    )}
  </Stack>
</div>
      {/* Table */}
      <TableContainer className="rounded-xl mt-5">
        <Table>
          <TableHead className="bg-gray-100">
            <TableRow>
              {visibleColumns.map((col) => (
                <TableCell
                  key={col}
                  className="font-semibold text-gray-700 border-b border-gray-300"
                >
                  <TableSortLabel
                    active={sortBy === col}
                    direction={sortOrder}
                    onClick={() => dispatch(setSort({ key: col }))}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                align="center"
                className="font-semibold text-gray-700 border-b border-gray-300"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50 transition">
                  {visibleColumns.map((col) => (
                    <TableCell key={col} className="border-b border-gray-200">
                      {isEditing || rowEditingId === row.id ? (
                        <TextField
                          value={editedRows[row.id]?.[col] ?? row[col] ?? ''}
                          size="small"
                          onChange={(e) =>
                            handleEditChange(row.id, col, e.target.value)
                          }
                        />
                      ) : (
                        <span className="text-gray-800">{row[col]}</span>
                      )}
                    </TableCell>
                  ))}

                  <TableCell align="center" className="border-b border-gray-200">
                    {rowEditingId === row.id ? (
                      <div className="flex justify-center gap-2">
                        <Tooltip title="Save">
                          <IconButton
                            color="success"
                            onClick={() => handleRowSave(row.id)}
                          >
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton color="error" onClick={handleRowCancel}>
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <Tooltip title="Edit Row">
                          <IconButton
                            color="primary"
                            onClick={() => setRowEditingId(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Row">
                          <IconButton
                            color="error"
                            onClick={() => confirmDelete(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="mt-4">
        <TablePagination
          component="div"
          count={sortedRows.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </div>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>Are you sure you want to delete this row?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTable;