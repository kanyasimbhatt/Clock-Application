import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";

function App() {
  const Home = lazy(() => import("./components/Home"));
  const StopWatch = lazy(() => import("./components/StopWatch"));
  const Timer = lazy(() => import("./components/Timer"));
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
