import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

function App() {
  const StopWatch = lazy(() => import("./components/StopWatch"));
  const Timer = lazy(() => import("./components/Timer"));
  const Home = lazy(() => import("./components/Home"));
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/stop-watch"
          element={
            <Suspense>
              <StopWatch />
            </Suspense>
          }
        />
        <Route
          path="/count-down"
          element={
            <Suspense>
              <Timer />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
