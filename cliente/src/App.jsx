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
import { SalonProvider } from "./context/SalonContext.jsx";
import { AlumnoProvider } from "./context/AlumnoContext.jsx";
import NavBar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Curso from "./pages/Curso.jsx";
import CursoForm from "./pages/CursoForm.jsx";
import { CursoProvider } from "./context/CursoContext.jsx";
import Profesor from "./pages/Profesor.jsx";
import ProfesorForm from "./pages/ProfesorForm.jsx";
import { ProfesorProvider } from "./context/ProfesorContext.jsx";
import GestionarAlumnos from "./pages/Pages-Alumno/GestionarAlumnos.jsx";
import AlumnoForm from "./pages/Pages-Alumno/AlumnoForm.jsx";
import VerificarAlumno from "./pages/Pages-Alumno/VerificarAlumno.jsx";
import MatricularAlumno from "./pages/Pages-Alumno/MatricularAlumno.jsx";
import CursoAsign from "./pages/CursoAsign.jsx";
import VProfesorPage from "./pages/VProfesorPage.jsx";
import PcPage from "./pages/PCPage.jsx";
import PcsBySalonPage from "./pages/PcsBySalonPage.jsx";
import PcForm from "./pages/PcForm.jsx";
import { PcProvider } from "./context/PcContext.jsx";
import VAlumnoPage from "./pages/VAlumnoPage.jsx";
import VAlumnoSalonPage from "./pages/VAlumnoSalonPage.jsx";
import VAlumnoForm from "./pages/VAlumnoForm.jsx";

import { VisitanteProvider } from "./context/VisitanteContext.jsx";

function App() {
  return (
    <AuthProvider>
      <PcProvider>
      <SalonProvider>
      <CursoProvider>
      <VisitanteProvider>
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
                  <Route path="/agregar-curso" element={<CursoForm />} />
                  <Route path="/curso/:id" element={<CursoForm />} />
                  <Route path="/curso/asignar/:id" element={<CursoAsign />} />

                  <Route path="/profesor" element={<Profesor />} />
                  <Route path="/agregar-profesor" element={<ProfesorForm />} />
                  <Route path="/profesor/:id" element={<ProfesorForm />} />

                  <Route path="/listado-alumnos" element={<GestionarAlumnos/>}/>
                  <Route path="/form-alumno" element={<AlumnoForm/>}/>
                  <Route path="/form-alumno/:id" element={<AlumnoForm/>}/>
                  <Route path="/matricular-alumno/:id" element={<MatricularAlumno/>}/>

                  <Route path="/pc" element={<PcPage />} />
                  <Route path="/pcporsalon/:id" element={<PcsBySalonPage/>} />
                  <Route path="/registrar-pc/:id" element={<PcForm/>} />

                  <Route path="/visitante-profesor" element={<VProfesorPage />} />

                  <Route path="/visitante-alumno" element={<VAlumnoPage />} />
                  <Route path="/visitante-alumno/salon/:id" element={<VAlumnoSalonPage/>} />
                  <Route path="/visitante-alumno/salon/pc/:id" element={<VAlumnoForm/>} />
                  

                </Route>
            </Routes>
            
            </main>
        </BrowserRouter>
      </AlumnoProvider>
      </ProfesorProvider>
      </VisitanteProvider>
      </CursoProvider>
      </SalonProvider>
      </PcProvider>
    </AuthProvider>



  );
}

export default App;