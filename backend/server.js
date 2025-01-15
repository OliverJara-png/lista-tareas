const dotenv = require('dotenv');
dotenv.config(); // Asegúrate de cargar dotenv primero

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde el directorio frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api', taskRoutes);

// Manejar todas las rutas con la página index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
