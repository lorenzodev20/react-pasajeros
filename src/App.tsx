import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Home from "./pages/Home";
import { PassengerProvider } from "./context/PassengerContext";
import { AuthProvider } from "./context/AuthContext";
import CreatePassenger from "./pages/CreatePassenger";

function App() {
  return (
    <AuthProvider>
      <PassengerProvider>
        <BrowserRouter >
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Login />} />

            {/* Rutas protegidas dentro del layout autenticado */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/home" element={<Home />}/>
              <Route path="/passenger" element={<CreatePassenger />}/>
              {/* Aquí puedes agregar más rutas autenticadas */}
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter >
      </PassengerProvider>
    </AuthProvider>
  );
}

export default App
