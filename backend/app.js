const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config()

const userRoutes = require("./routes/userRoutes");

const postRoutes = require("./routes/postRoutes")

const app = express();

const helmet = require("helmet");

const path = require("path")

const  cors = require('cors');

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.ughiqby.mongodb.net/Groupomania?retryWrites=true&w=majority`,
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

app.use(express.json())
app.use(cors())
app.use("/images", express.static(path.join(__dirname,"images")))
app.use("/avatars", express.static(path.join(__dirname, "avatars")));

app.use("/api/auth", userRoutes)
app.use("/api/posts", postRoutes)

app.use(helmet());

module.exports = app;