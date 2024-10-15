import React, { useState } from 'react';

const Search = ({ students, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSearch = () => {
    let filteredList = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filterStatus) {
      filteredList = filteredList.filter(
        (student) =>
          (filterStatus === 'Active' && student.enrollmentStatus) ||
          (filterStatus === 'Inactive' && !student.enrollmentStatus)
      );
    }
    onFilter(filteredList);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-4 space-y-2 md:space-y-0 md:space-x-2">
    <input
      type="text"
      placeholder="Search Students"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border rounded p-2 w-full md:w-auto"
    />
    <select
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
      className="border rounded p-2 w-full md:w-auto"
    >
      <option value="">All</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
    <button
      onClick={handleSearch}
      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full md:w-auto"
    >
      Search/Filter
    </button>
  </div>
  );
};

export default Search;
