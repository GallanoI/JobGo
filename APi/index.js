const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const usersFile = 'users.json'; //Temporal

const getUsers = () => {
    const data = fs.readFileSync(usersFile);                       //Temporal
    return JSON.parse(data);                                       //Temporal
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));  //Temporal
};

// Endpoint para login de usuario
app.get('/login', (req, res) => {
    const { User, password } = req.body;

    if (!User || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const users = getUsers();
    const user = users.find(u => u.User === User && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Login exitoso', user });
});

// Endpoint para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { name, User, password, user_type } = req.body;

    if (!name || !User || !password || !user_type) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const users = getUsers();
    const userExists = users.some(user => user.User === User);

    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        User,
        password,
        user_type
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
