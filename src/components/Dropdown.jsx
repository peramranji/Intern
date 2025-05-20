import React from 'react';

const Dropdown = ({ options, selected, setSelected }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <select
        value={selected.value}
        onChange={(e) => {
          const selectedOption = options.find(opt => opt.value === e.target.value);
          setSelected(selectedOption);
        }}
        className="w-full sm:w-auto p-2 rounded-md bg-gray-800 text-white border border-gray-600"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

