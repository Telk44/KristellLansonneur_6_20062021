const fs = require('fs');//package qui permet de modifier ou supprimer des fichiers
const Sauce = require('../models/Sauce');


//création d'une sauce
exports.createSauce= (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
  };
  
//récupérer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce=> res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

//modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
      .catch(error => res.status(400).json({ error }));
  };

//supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce=> {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  }; 

  // récupérer liste de toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

exports.tasteSauce = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  const sauceId = req.params.id;

  if (like === 1) { // si l'utilisateur aime la sauce et dont l'userId n'est pas enregistré
      Sauce.updateOne({ _id: sauceId}, { $inc: {likes:+1}, $push: {usersLiked: userId} }) // on ajoute 1 like et ajoute id de l'utilisateur dans le tableau usersLiked
          .then((sauce) => res.status(200).json({ message: 'Un like de plus!' }))
          .catch(error => res.status(400).json({ error }));
  } else if (like === -1) { // si utilisateur n'aime pas la sauce et dont l'userId n'est pas enregistré
      Sauce.updateOne({ _id: sauceId}, { $inc: {dislikes:+1}, $push: {usersDisliked: userId} }) // on ajoute 1 dislike et et ajoute l'id de l'utilisateur dans le tableau usersDisliked 
          .then((sauce) => res.status(200).json({message: 'un dislike de plus !'}))
          .catch(error => res.status(400).json({ error }));
  } else { // si l'utilisateur enlève son vote ou veut revoter
      Sauce.findOne({ _id: sauceId })
          .then(sauce => {
              if (sauce.usersLiked.includes(userId)) { // si le tableau usersLiked contient le userId de celui qui enlève son like 
                  Sauce.updateOne({ _id: sauceId}, { $pull: {usersLiked: userId}, $inc: {likes: -1} }) // $pull : ça vide l'array userLiked et ça enleve un like sinon le meme utilisateur pourrai ajouter plusieurs like
                      .then((sauce) => { res.status(200).json({ message: 'Un like de moins !' }) })
                      .catch(error => res.status(400).json({ error }))
              }
              if (sauce.usersDisliked.includes(userId)) { // si le tableau userDisliked contient le userId de celui qui enlève son dislike 
                  Sauce.updateOne({ _id: sauceId}, { $pull: {usersDisliked: userId}, $inc: {dislikes: -1} })//on enlève l'userId du tableau et 1 des dislikes
                      .then((sauce) => {res.status(200).json({message: 'Un dislike de moins !'}) })
                      .catch(error => res.status(400).json({ error }))
              }
          })
          .catch(error => res.status(400).json({ error }));
  }
};

