'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setRows, toggleColumn, setColumns } from '@/store/tableSlice';
import { useForm } from 'react-hook-form';

interface FormValues {
  newColumn: string;
}

const ManageColumnsModal = () => {
  const dispatch = useDispatch();
  const { columns, visibleColumns, rows } = useSelector(
    (state: RootState) => state.table
  );

  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  // Add New Column
  const handleAddColumn = (data: FormValues) => {
    const newCol = data.newColumn.trim();

    if (newCol && !columns.includes(newCol)) {
      // Add new column to every row
      const updatedRows = rows.map((row) => ({ ...row, [newCol]: '' }));

      // Add to column list
      const updatedColumns = [...columns, newCol];

      // Dispatch updates
      dispatch(setRows(updatedRows));
      dispatch(setColumns(updatedColumns));
      dispatch(toggleColumn(newCol)); // show it
      reset();
    }
  };

  // 🗑 Delete Column
  const handleDeleteColumn = (col: string) => {
    // Remove column from every row
    const updatedRows = rows.map((row) => {
      const { [col]: _, ...rest } = row;
      return rest;
    });

    // Remove from column list and visible list
    const updatedColumns = columns.filter((c) => c !== col);

    dispatch(setRows(updatedRows));
    dispatch(setColumns(updatedColumns));
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Manage Columns
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Manage Columns</DialogTitle>
        <DialogContent>
          {/*  Column list with show/hide + delete */}
          <FormGroup>
            {columns.map((col) => (
              <Stack
                key={col}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={visibleColumns.includes(col)}
                      onChange={() => dispatch(toggleColumn(col))}
                    />
                  }
                  label={col.charAt(0).toUpperCase() + col.slice(1)}
                />
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteColumn(col)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </FormGroup>

          {/*  Add new column */}
          <form onSubmit={handleSubmit(handleAddColumn)}>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <TextField
                {...register('newColumn')}
                label="Add New Column"
                size="small"
                fullWidth
              />
              <Button type="submit" variant="contained">
                Add
              </Button>
            </Stack>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageColumnsModal;