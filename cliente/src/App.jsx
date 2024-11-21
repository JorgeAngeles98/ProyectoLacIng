import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos

import RegistroPage from "./pages/RegistroPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./context/AuthContext";
import SalonesPage from "./pages/Salones";
import SalonFormPage from "./pages/SalonForm.jsx";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import CuentaPage from "./pages/CuentaPage";
import { SalonProvider } from "./context/SalonContent.jsx";
import { AlumnoProvider } from "./context/AlumnoContext.jsx";
import NavBar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Curso from "./pages/Curso.jsx";
import CursoForn from "./pages/CursoForn.jsx";
import { CursoProvider } from "./context/CursoContent.jsx";
import Profesor from "./pages/Profesor.jsx";
import ProfesorForm from "./pages/ProfesorForm.jsx";
import { ProfesorProvider } from "./context/ProfesorContent.jsx";
import GestionarAlumnos from "./pages/Pages-Alumno/GestionarAlumnos.jsx";
import AlumnoForm from "./pages/Pages-Alumno/AlumnoForm.jsx";
import VerificarAlumno from "./pages/Pages-Alumno/VerificarAlumno.jsx";


function App() {
  return (
    <AuthProvider>
      <SalonProvider>
      <CursoProvider>
      <ProfesorProvider>
      <AlumnoProvider>
        <BrowserRouter>
          <NavBar/>
          <main className="container mx-auto px-10">

              <ToastContainer position="bottom-right" />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registro" element={<RegistroPage />} /> 
                <Route path="/verificar-alumno" element={<VerificarAlumno />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cuenta" element={<CuentaPage />} />

                  <Route path="/salon" element={<SalonesPage />} />
                  <Route path="/agregar-salon" element={<SalonFormPage />} />
                  <Route path="/salon/:id" element={<SalonFormPage />} />

                  <Route path="/curso" element={<Curso />} />
                  <Route path="/agregar-curso" element={<CursoForn />} />
                  <Route path="/curso/:id" element={<CursoForn />} />

                  <Route path="/profesor" element={<Profesor />} />
                  <Route path="/agregar-profesor" element={<ProfesorForm />} />
                  <Route path="/profesor/:id" element={<ProfesorForm />} />

                  <Route path="/listado-alumnos" element={<GestionarAlumnos/>}/>
                  <Route path="/ver-alumno/:id" element={<AlumnoForm/>}/>
                  <Route path="/agregar-alumno" element={<AlumnoForm/>}/>
                  <Route path="/editar-alumno/:id" element={<AlumnoForm/>}/>

                </Route>
            </Routes>
            
            </main>
        </BrowserRouter>
      </AlumnoProvider>
      </ProfesorProvider>
      </CursoProvider>
      </SalonProvider>
    </AuthProvider>



  );
}

export default App;