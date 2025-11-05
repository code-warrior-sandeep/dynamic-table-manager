📊 Dynamic Table Manager

A modern, fully dynamic data table manager built with Next.js + TypeScript + Redux Toolkit + Tailwind CSS.
It supports import/export CSV, add/delete columns, inline editing, sorting, search, and persistent data storage using Redux Persist.

🚀 Features

✅ Dynamic Columns — Add or delete columns anytime using a modal.
✅ Inline Editing — Double-click cells to edit values directly.
✅ CSV Import & Export — Upload CSV files or download your table data.
✅ Persistent State — Redux Persist keeps your data after refresh.
✅ Sorting & Search — Sort by any column or filter by keyword.
✅ Responsive UI — Styled using Tailwind CSS and Material UI.
✅ TypeScript Safety — Strong typing for maintainable, scalable code.

🛠️ Tech Stack

⚡ Next.js 14 (App Router)

🧠 TypeScript

🧩 Redux Toolkit + Redux Persist

🎨 Tailwind CSS

🧰 MUI (Material UI)

📂 PapaParse & FileSaver.js (for CSV import/export)

dynamic-table-manager/
│
├── src/
│   ├── app/
│   │   ├── page.tsx               # Main page (loads table)
│   │   ├── layout.tsx             # App layout with providers
│   │   └── globals.css            # Global Tailwind styles
│   │
│   ├── components/
│   │   ├── DataTable.tsx          # Table UI and logic
│   │   ├── ManageColumnsModal.tsx # Add/Delete columns
│   │   ├── ImportExportButtons.tsx# CSV import/export
│   │
│   ├── store/
│   │   ├── tableSlice.ts          # Redux logic for table state
│   │   └── index.ts               # Store configuration
│   │
│   └── utils/
│       └── CsvUtils.ts            # CSV import/export helpers
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md


git clone https://github.com/code-warrior-sandeep/dynamic-table-manager.git
cd dynamic-table-manager

npm install
npm run dev


🧠 Usage Guide
➕ Add a New Column

Click “Manage Columns” → Add New Column, type a name (e.g. Department), and press Add.

🗑️ Delete a Column

Click the red 🗑 Delete icon next to a column name in Manage Columns modal.

✏️ Edit a Cell

Double-click any cell → change text → press Enter or click away to save.

📥 Import CSV

Click “Import CSV” → Choose File.
Ensure your CSV has headers matching existing columns.
