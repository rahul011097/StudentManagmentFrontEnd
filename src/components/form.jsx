import React, { useState, useEffect } from 'react';

const Form = ({ addOrEditStudent, editStudent }) => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    grade: 'A',
    enrollmentStatus: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editStudent) {
      setStudent(editStudent);
    } else {
      setStudent({ name: '', age: '', grade: 'A', enrollmentStatus: false });
    }
    setErrors({}); 
  }, [editStudent]);

  const validateForm = () => {
    let formErrors = {};

    
    if (!student.name.trim()) {
      formErrors.name = 'Please Enter Your Name';
    }

    // Validate age (must be a number and in a reasonable range)
    if (!student.age) {
      formErrors.age = 'Please Enter Your Age';
    } else if (isNaN(student.age) || student.age <= 0 || student.age > 100) {
      formErrors.age = 'Please enter a valid age between 1 and 100';
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      addOrEditStudent(student);
      setStudent({ name: '', age: '', grade: 'A', enrollmentStatus: false });
      setErrors({});
    } else {
      setErrors(formErrors);
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
          className={`border rounded p-2 w-full ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
      </div>
      <div className="flex flex-col">
        <input
          type="number"
          placeholder="Age"
          value={student.age}
          onChange={(e) => setStudent({ ...student, age: e.target.value })}
          className={`border rounded p-2 w-full ${errors.age ? 'border-red-500' : ''}`}
        />
        {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
      </div>
      <div className="flex flex-col">
        <select
          value={student.grade}
          onChange={(e) => setStudent({ ...student, grade: e.target.value })}
          className="border rounded p-2 w-full"
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
        className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
      >
        {editStudent ? 'Update' : 'Add'} Student
      </button>
    </form>
  );
};

export default Form;
