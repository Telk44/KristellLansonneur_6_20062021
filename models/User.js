//importation mongoose
const mongoose = require('mongoose'); 
//package de validation pour pré-valider les informations avant de les enregistrer dans la BDD
const uniqueValidator = require('mongoose-unique-validator'); 

//création d'un schema de données utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//exportation du modèle terminé dans mongoose
module.exports = mongoose.model('User', userSchema);