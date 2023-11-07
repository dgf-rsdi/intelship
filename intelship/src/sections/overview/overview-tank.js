import React from 'react';

const OverviewTank = () => {
  const tankHeight = 200; // Height of the tank in pixels
  const waterHeight = (50 / 100) * tankHeight; // Calculate the water height based on the level percentage

  return (
    <div className="water-tank">
      <div className="water" style={{ height: waterHeight }}></div>
      <div className="tank"></div>
    </div>
  );
};

export default OverviewTank;
