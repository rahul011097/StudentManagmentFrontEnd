
import React, { useState, useEffect } from 'react';

const Form = ({ addOrEditStudent, editStudent }) => {
    const [student, setStudent] = useState({
        name: '',
        age: '',
        grade: 'A',
        enrollmentStatus: false,
      });
    
      useEffect(() => {
        if (editStudent) {
          setStudent(editStudent);
        } else {
          setStudent({ name: '', age: '', grade: 'A', enrollmentStatus: false });
        }
      }, [editStudent]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (student.name && student.age) {
          addOrEditStudent(student);
          setStudent({ name: '', age: '', grade: 'A', enrollmentStatus: false });
        } else {
          alert("Please fill out all fields.");
        }
      };
  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Name"
        value={student.name}
        onChange={(e) => setStudent({ ...student, name: e.target.value })}
        className="border rounded p-2"
      />
    </div>
    <div className="flex flex-col">
      <input
        type="number"
        placeholder="Age"
        value={student.age}
        onChange={(e) => setStudent({ ...student, age: e.target.value })}
        className="border rounded p-2"
      />
    </div>
    <div className="flex flex-col">
      <select
        value={student.grade}
        onChange={(e) => setStudent({ ...student, grade: e.target.value })}
        className="border rounded p-2"
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="F">F</option>
      </select>
    </div>
    <div className="flex items-center space-x-2">
    <input
        type="checkbox"
        checked={student.enrollmentStatus}
        onChange={(e) => setStudent({ ...student, enrollmentStatus: e.target.checked })}
        className="form-checkbox h-4 w-4 text-blue-600"
      />
      <label className="text-gray-700">Active Enrollment</label>
     
    </div>
    <button
      type="submit"
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    >
      {editStudent ? 'Update' : 'Add'} Student
    </button>
  </form>
  
  )
}

export default Form