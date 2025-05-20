import React from 'react';

const PriceList = ({ data }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-2xl font-semibold mb-4">Price Data (Last 7 Days)</h3>
      {data.length ? (
        <div className="space-y-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex justify-between text-gray-300">
              <span>{item.date}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No data available.</p>
      )}
    </div>
  );
};

export default PriceList;