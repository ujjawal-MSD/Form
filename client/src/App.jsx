import { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Header from "./Components/Header";
import Container from "./Components/Container";

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading (for demonstration)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            visible={true}
            ariaLabel="Loading..."
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : (
        <>
          <Header />
          <Container />
        </>
      )}
    </>
  );
}

export default App;