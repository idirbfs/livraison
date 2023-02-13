import React, { useState } from "react";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isLoggedIn ? (
        <p>You are logged in!</p>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
