// Express + Mongo 
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Routes
const path = require('path'); 
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Securité 
const Ddos = require('ddos');
const ddos = new Ddos({burst:10, limit:15})
app.use(ddos.express);

const helmet = require("helmet");

const mongoSanitize = require('express-mongo-sanitize');

// Connexion MongoDb avec le fichier dotenv
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.gqapm.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Gestion JSON 
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'images')));

// Application des routes 
app.use('/api/sauces',sauceRoutes);
app.use('/api/auth',userRoutes);

// Application sécurité
app.use(helmet());
app.use(mongoSanitize());

module.exports = app;