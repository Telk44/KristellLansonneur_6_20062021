const mongoose = require('mongoose'); //importation mongoose
const uniqueValidator = require('mongoose-unique-validator'); //package de validation pour pré-valider les informations avant de les enregistrer dans la BDD

//création d'un schema de données utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//exportation du modèle terminé dans mongoose
module.exports = mongoose.model('User', userSchema);