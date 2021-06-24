const express = require('express'); // Importation du package Express (Framework Node.JS)
const mongoose = require('mongoose'); //Importation package mongoose pour faciliter connection avec la Base de données (mongo DB)
const saucesRoutes = require('./routes/sauces'); 
const userRoutes = require('./routes/user'); 
const path = require('path');
const helmet = require('helmet'); //pour protéger l'application des vulnérabilités du web en configurant correctement les entêtes http
const mongoSanitize = require('express-mongo-sanitize');//pour prévenir les opérations d'injection sur la BDD

require('dotenv').config();

//connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.lokpb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// Pour enlever les datas
app.use(mongoSanitize());

// pour remplacer les caractères interdits et les remplacer par _
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
//rendre les images accessibles publiquement pour toutes les requêtes vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;