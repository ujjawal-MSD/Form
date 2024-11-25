import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import NewClient from './Components/NewClient';
import { Oval } from 'react-loader-spinner'; // Importing the loader

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [loaderDelay, setLoaderDelay] = useState(0); // State to set loader delay

  useEffect(() => {
    // Simulate a network delay or delay before hiding the loader
    const start = performance.now(); // Get the start time

    // You can simulate time taken to load components by using setTimeout
    setTimeout(() => {
      const loadTime = performance.now() - start; // Calculate the time it took to load
      setLoaderDelay(Math.max(1000 - loadTime, 0)); // Set a minimum delay (e.g., 1 second)
      setIsLoading(false); // Set loading to false when components are rendered
    }, 0); // Set an initial timeout of 0, it will run right after the render

  }, []);

  return (
    <>
      {isLoading && (
        <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Oval color="#16a34a" height={80} width={80} /> {/* React Loader Spinner */}
        </div>
      )}
      {!isLoading && (
        <>
          <Header />
          <NewClient />
        </>
      )}
    </>
  );
}

export default App;
