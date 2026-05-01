import React from "react";
import bg from '../portfolio-img.jpg';

export function MyPortfolio() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          height: '100vh'
        }}
      >
        <div>
          {/* content */}
        </div>
      </div>
    </>
  );
}