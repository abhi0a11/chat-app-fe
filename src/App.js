import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "./context/SocketContext.js";
//socket io
const socket = io(process.env.REACT_APP_API_ENDPOINT.split("/api/v1")[0]);

function App() {
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={token ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!token ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/register"
              element={!token ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
