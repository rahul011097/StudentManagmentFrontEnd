import React, { useState, useEffect } from 'react';
import Form from './components/form';
import Search from './components/Search';
import StudentRecord from './components/StudentRecord';

function App() {
  const saveStudentsToLocalStorage = (students) => {
    localStorage.setItem('students', JSON.stringify(students));
  };
  
  const getStudentsFromLocalStorage = () => {
    const storedStudents = localStorage.getItem('students');
    return storedStudents ? JSON.parse(storedStudents) : [];
  };

  const [students, setStudents] = useState(getStudentsFromLocalStorage());
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [editStudent, setEditStudent] = useState(null);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  

  useEffect(() => {
    saveStudentsToLocalStorage(students);
    setFilteredStudents(students); 
  }, [students]);


  const addOrEditStudent = (student) => {
    if (editStudent) {
      const updatedStudents = students.map((s) =>
        s.id === editStudent.id ? student : s
      );
      setStudents(updatedStudents);
      setEditStudent(null);
    } else {
       const nextId = students.length > 0
        ? Math.max(...students.map(s => s.id)) + 1
        : 101;
  
      // Add new student with the next ID
      setStudents([...students, { ...student, id: nextId }]);
    }
  };
  

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleFilter = (filteredList) => {
    setFilteredStudents(filteredList);
  };

  const sortStudents = (field) => {
    const sortedStudents = [...filteredStudents].sort((a, b) => {
      if (a[field] < b[field]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setFilteredStudents(sortedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
    <h1 className="text-3xl font-bold text-center text-gray-600 mb-4">Student Record Management</h1>
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
      <Form addOrEditStudent={addOrEditStudent} editStudent={editStudent} />
    <Search students={students} onFilter={handleFilter} />
      <StudentRecord students={filteredStudents} deleteStudent={deleteStudent} setEditStudent={setEditStudent} sortStudents={sortStudents}
          sortField={sortField}
          sortOrder={sortOrder} />
    </div>
  </div>
  );
}

export default App;
