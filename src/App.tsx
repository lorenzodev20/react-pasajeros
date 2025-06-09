import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Home from "./pages/Home";

function App() {
  const isAuthenticated = true;
  return (
    <BrowserRouter >
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas dentro del layout autenticado */}
        {isAuthenticated && (
          <Route element={<AuthenticatedLayout />}>
            <Route path="/home" element={<Home />} />
            {/* Aquí puedes agregar más rutas autenticadas */}
          </Route>
        )}

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App
