import app from './app.js';
import { connectDB } from './db.js';

const PORT = 4000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor conectado en el puerto`, PORT);
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

startServer();