import React from 'react';

const HiveSummaryCard = ({ number, label }) => (
  <div className="flex flex-col justify-center items-center bg-[#F7B440] w-[280px] font-poppins font-bold h-[258px] text-[#013A55] border-2 border-yellow-400 shadow-2xl p-6 rounded-lg  text-center">
    <h2 className="text-5xl ">{number}</h2>
    <p className="text-4xl  mt-2 ">{label}</p>
  </div>
);

export default HiveSummaryCard;
