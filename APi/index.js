const express = require('express');
const cors = require('cors'); // Importar cors
const fs = require('fs');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json());
app.use(cors()); // Usar cors para permitir solicitudes desde cualquier origen


const usersFile = 'users.json';
const viajesFile = 'viajes.json';
const secretKey = 'your-secret-key'; // Cambia esta clave a algo más seguro y guárdala en variables de entorno en producción

const getUsers = () => {
    const data = fs.readFileSync(usersFile);
    return JSON.parse(data);
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const getViajes = () => {
    const data = fs.readFileSync(viajesFile);
    return JSON.parse(data);
};

const saveViajes = (viajes) => {
    fs.writeFileSync(viajesFile, JSON.stringify(viajes, null, 2));
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    const token = authHeader.split(' ')[1]; // Separar "Bearer" del token
    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.userId = decoded.id;
        next();
    });
};

// Endpoint para login de usuario
app.post('/login', (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const users = getUsers();
    const user = users.find(u => u.mail === mail && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });

    // Guardar el token en el usuario específico
    user.token = token;
    saveUsers(users);

    res.status(200).json({ message: 'Login exitoso', token });
});

// Ruta para obtener los datos del usuario autenticado
app.get('/me', verifyToken, (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.id === req.userId);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ user });
});

// Endpoint para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { name, mail, password, user_type } = req.body;

    if (!name || !mail || !password || !user_type) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    if (!mail.includes("@") || !(  mail.endsWith(".com") ||  mail.endsWith(".cl"))  ) {
        return res.status(400).json({ message: 'Formato de E-mail incorrecto' });
    }
    
    if (password.length <= 8 || !(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(password))) {
        return res.status(400).json({ message: 'La contraseña es débil' });
    }
    

    const users = getUsers();
    const userExists = users.some(user => user.mail === mail);

    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        mail,
        password,
        user_type
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
});

// Endpoint para subir un nuevo viaje
app.post('/new-viaje', verifyToken, (req, res) => {
    const { driverId, startLocation, endLocation, route, availableSeats } = req.body;

    if (!driverId || !startLocation || !endLocation || !route || !availableSeats) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const viajes = getViajes();

    const newViaje = {
        id: viajes.length + 1,
        driverId,
        startLocation,
        endLocation,
        route,
        availableSeats
    };

    viajes.push(newViaje);
    saveViajes(viajes);

    res.status(201).json({ message: 'Viaje registrado exitosamente', viaje: newViaje });
});

// Endpoint para obtener todos los viajes
app.get('/viajes', verifyToken, (req, res) => {
    const viajes = getViajes();
    res.status(200).json(viajes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
