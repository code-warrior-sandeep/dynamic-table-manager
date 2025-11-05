import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  [key: string]: any;
}

interface TableState {
  rows: TableRow[];
  columns: string[];
  visibleColumns: string[];
  searchTerm: string;
  sortBy: string | null;
  sortOrder: 'asc' | 'desc';
}

const initialState: TableState = {
  rows: [],
  columns: ['name', 'email', 'age', 'role'],
  visibleColumns: ['name', 'email', 'age', 'role'],
  searchTerm: '',
  sortBy: null,
  sortOrder: 'asc',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    // Update all rows
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload || [];
    },
    

    //  Add or remove column visibility
    toggleColumn: (state, action: PayloadAction<string>) => {
      const col = action.payload;
      if (state.visibleColumns.includes(col)) {
        state.visibleColumns = state.visibleColumns.filter((c) => c !== col);
      } else {
        state.visibleColumns.push(col);
      }
    },

    // Update full column list (used when adding new column)
    setColumns: (state, action: PayloadAction<string[]>) => {
      state.columns = action.payload;
    },

    // Search
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    //  Sorting
    setSort: (state, action: PayloadAction<{ key: string }>) => {
      if (state.sortBy === action.payload.key) {
        state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = action.payload.key;
        state.sortOrder = 'asc';
      }
    },
  },
});

export const { setRows, toggleColumn, setSearchTerm, setSort, setColumns } =
  tableSlice.actions;

export default tableSlice.reducer;