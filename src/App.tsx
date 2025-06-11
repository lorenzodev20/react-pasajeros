import { BrowserRouter, Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Home from "./pages/Home";
import { PassengerProvider } from "./context/PassengerContext";
import { AuthProvider } from "./context/AuthContext";
import CreatePassenger from "./pages/CreatePassenger";
import RedirectToHomeIfAuthenticated from "./routes/RedirectToHomeIfAuthenticated";
import Passengers from "./pages/Passengers";
import CreatePayment from "./pages/CreatePayment";

function App() {
  return (
    <AuthProvider>
      <PassengerProvider>
        <BrowserRouter >
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<RedirectToHomeIfAuthenticated />} />
            {/* <Route path="/" element={<Login />} /> */}

            {/* Rutas protegidas dentro del layout autenticado */}
            <Route element={<AuthenticatedLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/passenger" element={<CreatePassenger />} />
              <Route path="/passengers" element={<Passengers />} />
              <Route path="/payments/:passengerId" element={<CreatePayment/>} />
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
