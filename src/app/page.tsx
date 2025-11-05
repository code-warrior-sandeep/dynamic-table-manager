'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRows } from '@/store/tableSlice';
import ImportExportButtons from '@/components/ImportExportButtons';
import ManageColumnsModal from '@/components/ManageColumnsModal';
import DataTable from '@/components/DataTable';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const demoRows = [
      { id: '1', name: 'Sandeep', email: 'sandeep@example.com', age: 25, role: 'Developer' },
      { id: '2', name: 'Ravi', email: 'ravi@example.com', age: 30, role: 'Manager' },
      { id: '3', name: 'Priya', email: 'priya@example.com', age: 28, role: 'Designer' },
      { id: '4', name: 'Anjali', email: 'anjali@example.com', age: 26, role: 'Tester' },
      { id: '5', name: 'Amit', email: 'amit@example.com', age: 35, role: 'Team Lead' },
      { id: '6', name: 'Karan', email: 'karan@example.com', age: 29, role: 'Engineer' },
      { id: '7', name: 'Neha', email: 'neha@example.com', age: 31, role: 'QA Engineer' },
      { id: '8', name: 'Arjun', email: 'arjun@example.com', age: 27, role: 'Frontend Dev' },
      { id: '9', name: 'Meera', email: 'meera@example.com', age: 24, role: 'Intern' },
      { id: '10', name: 'Vivek', email: 'vivek@example.com', age: 33, role: 'Backend Dev' },
    ];
    dispatch(setRows(demoRows));
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6 md:p-10">
  {/* Centered Title */}
  <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center flex items-center gap-2">
    📊 Dynamic Data Table Manager
  </h1>

  {/* Toolbar — Import/Export on top, Manage Columns below */}
  <div className="flex flex-col justify-center items-center gap-4 mb-6">
    <ImportExportButtons /> 
    <ManageColumnsModal />
  </div>

  {/* Table Container */}
  <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md p-4 md:p-6">
    <DataTable />
  </div>
</main>

  );
}
