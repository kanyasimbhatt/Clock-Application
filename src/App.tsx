import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import StopWatch from "./components/StopWatch";
import Timer from "./components/Timer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stop-watch" element={<StopWatch />} />
        <Route path="/count-down" element={<Timer />} />
      </Routes>
    </Router>
  );
}

export default App;
