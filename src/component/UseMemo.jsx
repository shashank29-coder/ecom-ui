import React, {useMemo, useState} from "react";
export function UseMemo(){
     const [numbers, setNumbers] = useState([1,2,3,4,5,6,7,8]);
  const [count, setCount] = useState(0);

  // useMemo for filtering even numbers
  const evenNumbers = useMemo(() => {
    console.log("Filtering even numbers...");
    return numbers.filter(num => num % 2 === 0);
  }, [numbers]);  // only runs when numbers change

  return (
    <div>
      <h2>Even Numbers</h2>
      {evenNumbers.map((num, index) => (
        <p key={index}>{num}</p>
      ))}

      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count + 1)}>
        Increase Counter
      </button>
    </div>
  );
}