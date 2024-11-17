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
import Curso from "./pages/Curso.jsx";
import CursoForn from "./pages/CursoForn.jsx";
import { CursoProvider } from "./context/CursoContent.jsx";
import Profesor from "./pages/Profesor.jsx";
import ProfesorForm from "./pages/ProfesorForm.jsx";
import { ProfesorProvider } from "./context/ProfesorContent.jsx";


function App() {
  return (
    <AuthProvider>
      <SalonProvider>
      <CursoProvider>
      <ProfesorProvider>
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
                
                <Route path="/curso" element={<Curso />} />
                <Route path="/agregar-curso" element={<CursoForn />} />
                <Route path="/curso/:id" element={<CursoForn />} />

                <Route path="/profesor" element={<Profesor />} />
                <Route path="/agregar-profesor" element={<ProfesorForm />} />
                <Route path="/profesor/:id" element={<ProfesorForm />} />
                
              </Route>
            </Routes>
            
            </main>
        </BrowserRouter>
        </ProfesorProvider>
        </CursoProvider>
      </SalonProvider>
    </AuthProvider>



  );
}

export default App;