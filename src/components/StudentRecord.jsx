import React from 'react';

const StudentRecord = ({ students, deleteStudent, setEditStudent,sortStudents, sortType, sort}) => {
    const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      };
  return (
   <div>
    <h2 className='text-lg md:text-xl text-center font-bold pb-4 text-gray-600'>Students Records</h2>
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3 border-b">ID</th>

          
          <th className="p-3 border-b cursor-pointer" onClick={() => sortStudents('name')}>
            Name(↑↓) {sortType === 'name' && (sort === 'ASC' ? '↑' : '↓')}
          </th>

          
          <th className="p-3 border-b cursor-pointer" onClick={() => sortStudents('age')}>
            Age(↑↓) {sortType === 'age' && (sort === 'ASC' ? '↑' : '↓')}
          </th>

          
          <th className="p-3 border-b cursor-pointer" onClick={() => sortStudents('grade')}>
            Grade(↑↓) {sortType === 'grade' && (sort === 'ASC' ? '↑' : '↓')}
          </th>

          <th className="p-3 border-b">Enrollment Status</th>
          <th className="p-3 border-b">Actions</th>
        </tr>
      </thead>
  <tbody>
    {students.length > 0 ? (
      students.map((student) => (
        <tr key={student.id} className="hover:bg-gray-100">
          <td className="p-3 border-b">{student.id}</td>
          <td className="p-3 border-b">{capitalizeFirstLetter(student.name)}</td>
          <td className="p-3 border-b">{student.age}</td>
          <td className="p-3 border-b">{student.grade}</td>
          <td className="p-3 border-b">
            {student.enrollmentStatus ? 'Active' : 'Inactive'}
          </td>
          <td className="p-3 border-b">
            <button
              onClick={() => setEditStudent(student)}
              className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => deleteStudent(student.id)}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="p-3 text-center">No students found</td>
      </tr>
    )}
  </tbody>
</table>
   </div>

  );
};

export default StudentRecord;
