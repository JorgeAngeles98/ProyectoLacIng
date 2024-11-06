import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegistroPage from "./pages/RegistroPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthContext";
import SalonesPage from "./pages/Salones";
import SalonFormPage from "./pages/SalonForm.jsx";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import CuentaPage from "./pages/CuentaPage";
import { SalonProvider } from "./context/SalonContent.jsx";
import NavBar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";


function App() {
  return (
    <AuthProvider>
      <SalonProvider>
        <BrowserRouter>
          <NavBar/>
          <main className="container mx-auto px-10">

          
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/salon" element={<SalonesPage />} />
                <Route path="/agregar-salon" element={<SalonFormPage />} />
                <Route path="/salon/:id" element={<SalonFormPage />} />
                <Route path="/cuenta" element={<CuentaPage />} />
              </Route>
            </Routes>
            
            </main>
        </BrowserRouter>
      </SalonProvider>
    </AuthProvider>



  );
}

export default App;