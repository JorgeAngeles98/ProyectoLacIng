import { useProfesor } from "../context/ProfesorContext";
import { useEffect, useRef } from "react";
import ProfesorCard from "../components/ProfesorCard";
import { Link } from 'react-router-dom';
import { FaPlus, FaEye, FaFileExcel, FaFileImport } from 'react-icons/fa';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/img/logo.jpg'; // Importa el logo

function Profesor() {
    const { getProfesoresActivos, profesores, createProfesor } = useProfesor();
    const fileInputRef = useRef(null);

    useEffect(() => {
        getProfesoresActivos();
    }, []);

    const exportToExcel = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Profesores');

        const logoImage = await fetch(logo).then(res => res.arrayBuffer());
        const imageId = workbook.addImage({
            buffer: logoImage,
            extension: 'jpeg',
        });
        worksheet.addImage(imageId, {
            tl: { col: 0, row: 0 },
            ext: { width: 202, height: 95 },
        });
        worksheet.getRow(1).height = 85;
        const foto = worksheet.getCell('A1');
        foto.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
            

        worksheet.mergeCells('B1:E1');
        const titleCell = worksheet.getCell('B1');
        titleCell.value = 'Listado de Profesores';
        titleCell.font = { size: 20, bold: true };
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        titleCell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
            
        

        worksheet.addRow(['Nombre', 'Apellido', 'DNI', 'Correo', 'Estado']);
        const headerRow = worksheet.getRow(2);
        headerRow.font = { bold: true, size: 11 };
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' };
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        profesores.forEach(profesor => {
            const row = worksheet.addRow([
                profesor.nombre,
                profesor.apellido,
                profesor.codigo,
                profesor.correo,
                profesor.estado
            ]);

            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        worksheet.columns = [
            { width: 30 },
            { width: 30 },
            { width: 20 },
            { width: 30 },
            { width: 15 },
        ];

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'profesores.xlsx');
    };


    const importFromExcel = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const worksheet = workbook.getWorksheet('Profesores');
    
        const newProfesores = [];
        const existingCodigos = new Set(profesores.map(p => p.codigo));
        const existingCorreos = new Set(profesores.map(p => p.correo));
    
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber <= 2) return;
    
            const profesor = {
                nombre: row.getCell(1).text.trim(),
                apellido: row.getCell(2).text.trim(),
                codigo: row.getCell(3).text.trim(),
                correo: row.getCell(4).text.trim().replace(/^mailto:/, ''),
                estado: row.getCell(5).text.trim() || 'Activo',
            };
    
            // Validaciones
            if (!profesor.nombre || !profesor.apellido || !profesor.codigo || !profesor.correo) {
                toast.error(`Fila ${rowNumber}: Todos los campos son obligatorios`);
                return;
            }
            if (!/^\d{8}$/.test(profesor.codigo)) {
                toast.error(`Fila ${rowNumber}: El DNI debe tener 8 dígitos`);
                return;
            }
            if (!/\S+@\S+\.\S+/.test(profesor.correo)) {
                toast.error(`Fila ${rowNumber}: El correo no es válido`);
                return;
            }
            if (existingCodigos.has(profesor.codigo)) {
                toast.error(`Fila ${rowNumber}: El DNI ${profesor.codigo} ya existe en la base de datos`);
                return;
            }
            if (existingCorreos.has(profesor.correo)) {
                toast.error(`Fila ${rowNumber}: El correo ${profesor.correo} ya existe en la base de datos`);
                return;
            }
            if (profesor.estado !== 'Activo' && profesor.estado !== 'Inactivo') {
                toast.error(`Fila ${rowNumber}: El estado debe ser 'Activo' o 'Inactivo'`);
                return;
            }
    
            newProfesores.push(profesor);
        });
    
        // Crear nuevos profesores
        let addedCount = 0;
        for (const profesor of newProfesores) {
            await createProfesor(profesor);
            addedCount++;
        }
    
        if (addedCount > 0) {
            const message = `Se importó ${addedCount} profesor${addedCount > 1 ? 'es' : ''} exitosamente`;
            toast.success(message);
        }
    
        getProfesoresActivos();
    
        // Reset file input
        event.target.value = null;
    };
    

    return (
        <div>
            <ToastContainer position="bottom-right" />
            <div className="py-6 flex justify-center gap-4">
                <Link to='/agregar-profesor' className='bg-emerald-700 hover:bg-emerald-800 text-white w-1/4 py-3 rounded-sm text-2xl font-bold text-center flex items-center justify-center'>
                    <FaPlus className="mr-2" /> Agregar Profesor
                </Link>
                <Link to='/profesor/inactivo' className='bg-gray-700 hover:bg-gray-800 text-white w-1/4 py-3 rounded-sm text-2xl font-bold text-center flex items-center justify-center'>
                    <FaEye className="mr-2" /> Ver Inactivos
                </Link>
                <button onClick={exportToExcel} className='bg-green-700 hover:bg-green-800 text-white w-1/4 py-3 rounded-sm text-2xl font-bold text-center flex items-center justify-center'>
                    <FaFileExcel className="mr-2" /> Exportar
                </button>
                <button onClick={() => fileInputRef.current.click()} className='bg-blue-700 hover:bg-blue-800 text-white w-1/4 py-3 rounded-sm text-2xl font-bold text-center flex items-center justify-center'>
                    <FaFileImport className="mr-2" /> Importar
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept=".xlsx, .xls"
                    onChange={importFromExcel}
                />
            </div>

            {profesores.length === 0 ? (
                <h1>No hay profesores</h1>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {profesores.map((profesor) => (
                        <ProfesorCard profesor={profesor} key={profesor._id} refreshProfesores={getProfesoresActivos} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profesor;