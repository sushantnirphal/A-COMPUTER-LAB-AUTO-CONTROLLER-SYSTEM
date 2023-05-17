import React, { useState } from 'react';

const TestCasesF = () => {
  const [input, setInput] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  
  return (
    <div>
      <h2>TestCase</h2>
      <div>
        <label>Input:</label>
        <input name="input" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div>
        <label>Expected Output:</label>
        <input name="output" value={expectedOutput} onChange={(e) => setExpectedOutput(e.target.value)} />
      </div>
    </div>
  );
};

export default TestCasesF;