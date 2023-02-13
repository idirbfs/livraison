import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/client/Login";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    </BrowserRouter>
  );
}

export default App;
