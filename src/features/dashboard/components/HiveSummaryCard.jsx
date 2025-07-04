import React from 'react';

const HiveSummaryCard = ({ number, label }) => (
  <div className="bg-blue-900 text-white border-2 border-yellow-400 p-6 rounded-lg text-center">
    <h2 className="text-4xl font-bold">{number}</h2>
    <p className="text-lg mt-2">{label}</p>
  </div>
);

export default HiveSummaryCard;
