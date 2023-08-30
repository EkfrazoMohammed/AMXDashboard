import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [localStorageValue, setLocalStorageValue] = useState(null);

  useEffect(() => {
    // Access the parent window's localStorage
    const parentLocalStorage = window.parent.localStorage;

    // Get the desired value from parentLocalStorage
    const valueFromParent = parentLocalStorage.getItem('keyName');

    // Update the state with the value from the parent window's localStorage
    setLocalStorageValue(valueFromParent);
  }, []);

  return (
    <div>
      <h1>React Component Loaded in Iframe</h1>
      <p>Value from Parent Window's LocalStorage: {localStorageValue}</p>
    </div>
  );
};

export default MyComponent;
