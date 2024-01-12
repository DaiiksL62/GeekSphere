const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require('cors');


const app = express();
const port = 8000;

app.use(cors());

app.use('/uploads', express.static('uploads'));




// Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Remplacez cela par l'URL de votre application React
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "geeksphere",
});

connection.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données : ", err.stack);
        return;
    }
    console.log("Connexion à la base de données réussie avec l'ID : ", connection.threadId);
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/profiles"); // Répertoire où vous souhaitez stocker les fichiers
    },
    filename: function (req, file, cb) {
        const currentDate = new Date().toISOString().replace(/[-T:.Z]/g, ""); // Formatage de la date
        const extension = path.extname(file.originalname);
        cb(null, currentDate + extension);
    },
});

const upload = multer({ storage });


app.post("/inscription", upload.single("profilePicture"), async (req, res) => {
    const {
        username,
        firstName,
        lastName,
        email,
        password,
        agreeToTerms,
    } = req.body;

    // Vérifier si req.file existe avant d'accéder à ses propriétés
    const profilePicturePath = req.file ? req.file.path : null;

    try {
        // Validation des champs requis
        if (!username || !firstName || !lastName || !email || !password || !agreeToTerms) {
            res.status(400).json({ message: "Veuillez fournir tous les champs requis" });
            return;
        }

        // Hasher le mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Utilisez path.basename pour extraire le nom du fichier du chemin
        const fileName = profilePicturePath ? path.basename(profilePicturePath) : null;

        const query = "INSERT INTO utilisateur (pseudo, nom, prenom, email, mot_de_passe, avatar) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [username, lastName, firstName, email, hashedPassword, fileName];

        connection.query(query, values, (error, results, fields) => {
            if (error) {
                console.error("Erreur lors de l'insertion dans la base de données : ", error);
                res.status(500).json({ message: "Erreur lors de l'inscription" });
                return;
            }

            console.log("Utilisateur inscrit avec l'ID : ", results.insertId);
            res.status(201).json({ message: "Inscription réussie" });
        });
    } catch (error) {
        console.error("Erreur lors du hachage du mot de passe : ", error);
        res.status(500).json({ message: "Erreur lors de l'inscription" });
    }
});



// Importer les modules nécessaires, y compris la connexion à la base de données, bcrypt, etc.

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Vérifier si les champs sont fournis
        if (!username || !password) {
            res.status(400).json({ message: "Veuillez fournir un nom d'utilisateur et un mot de passe" });
            return;
        }

        const query = 'SELECT * FROM utilisateur WHERE pseudo = ?';
        const values = [username];

        connection.query(query, values, async (error, results) => {
            if (error) {
                console.error("Erreur lors de la connexion :", error);
                res.status(500).json({ message: 'Erreur lors de la connexion' });
                return;
            }

            if (results.length > 0) {
                const user = results[0];

                // Comparer le mot de passe haché
                const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);

                if (isPasswordValid) {
                    // Mot de passe correct
                    console.log(`L'utilisateur ${user.pseudo}  s'est connecté avec succès.`);

                    res.json({
                        id: user.id,
                        username: user.pseudo,
                        firstName: user.prenom,
                        lastName: user.nom,
                        // Ajouter d'autres informations utilisateur si nécessaire
                    });
                } else {
                    // Mot de passe incorrect
                    res.status(401).json({ message: 'Identifiants invalides' });
                }
            } else {
                // Utilisateur non trouvé
                res.status(401).json({ message: 'Identifiants invalides' });
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
});





app.get("/user", async (req, res) => {
    return "ok";
})



app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ message: 'Erreur lors de la déconnexion' });
            return;
        }

        res.status(200).json({ message: 'Déconnexion réussie' });
    });
});

app.listen(port, () => {
    console.log(`Serveur Node écoutant sur le port ${port}`);
});
