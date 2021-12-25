import React from "react";
import AppRouter from "components/Router";
import "./App.scss";
import { useState } from "react/cjs/react.development";

function App() {
  const [address, setaddress] = useState();

  const onLogin = (user) => {
    setaddress(user);
  }
  return (
    <div className="App">
      <AppRouter address={address} onLogin={onLogin}/>
    </div>
  );
}

export default App;
