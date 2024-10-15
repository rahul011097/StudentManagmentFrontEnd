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
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [sortType, setSortType] = useState('');
  const [sort, setSort] = useState('ASC');

  

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
      setStudents([...students, { ...student, id: nextId }]);
    }
  };
  

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleFilter = (filteredList) => {
    setFilteredStudents(filteredList);
  };

  const sortStudents = (type) => {
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aValue = typeof a[type] === 'string' ? a[type].toLowerCase() : a[type];
    const bValue = typeof b[type] === 'string' ? b[type].toLowerCase() : b[type];

    if (aValue < bValue) {
      return sort === 'ASC' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort === 'ASC' ? 1 : -1;
    }
    return 0;
  });

  setSortType(type);
  setSort(sort === 'ASC' ? 'DESC' : 'ASC');
  setFilteredStudents(sortedStudents);
};


  return (
    <div className="min-h-screen bg-gray-100 p-2 md:p-4">
    <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-600 mb-4">Student Record Management</h1>
    <div className="max-w-full md:max-w-3xl mx-auto bg-white shadow-md rounded p-4 md:p-6">
      <Form addOrEditStudent={addOrEditStudent} editStudent={editStudent} />
    <Search students={students} onFilter={handleFilter} />
      <StudentRecord students={filteredStudents} deleteStudent={deleteStudent} setEditStudent={setEditStudent} sortStudents={sortStudents}
          sortType={sortType}
          sort={sort} />
    </div>
  </div>
  );
}

export default App;
