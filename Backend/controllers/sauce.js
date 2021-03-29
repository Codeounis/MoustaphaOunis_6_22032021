const Sauce = require('../models/sauce');
const fs = require('fs');



// POST : creer une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
     likes :0,
     dislikes:0,
    });
    sauce.save()
      .then(() => res.status(201).json({message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({error}));
  };

// GET : Afficher une sauce sélectionné
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}) // recupère 1 sauce avec l id
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({error: error}));
  };


// PUT : modifer une sauce
exports.modifySauce = (req, res, next) => {
    // Logique pour supprimé l'ancienne image si une nouvelle est reçu
if (req.file) {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const fileName = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (err => { 
                if (err) console.log(err);
                else {
                    console.log("Image supprimée: " + fileName);
                }
            }))
        })
} 
    //  Puis mise à jour de l'objet sauce
const sauceObject = req.file ?
{
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body };
Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
.then(() => res.status(200).json( {message: 'Sauce modifiée !'}))
.catch(error => res.status(404).json({ error }));
}

// DELETE : supprimer une sauce 
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({
       _id: req.params.id
    })
    .then(sauce => {
      const fileName = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${fileName}`, () => { 
      Sauce.deleteOne({_id: req.params.id})
      .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({error}));
    });
  })
    .catch(error => res.status(500).json({error}));
  };

// POST : Likes and dislikes utilisateurs
exports.likeSauce = (req, res, next) => { 
  Sauce.findOne({_id: req.params.id})
  .then(sauce => {
    switch (req.body.like) {  
        case 1 : // Si like
            if (!sauce.usersLiked.includes(req.body.userId)) {  
              Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Like ajouté avec succès !' }))
              .catch(error => res.status(400).json({ error }));
            } 
          break;

        case -1 :  // Si dislike
            if (!sauce.usersDisliked.includes(req.body.userId)) {  
              Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.body.userId}, _id: req.params.id})
          .then(() => res.status(201).json({ message: 'Dislike ajouté avec succès !' }))
          .catch(error => res.status(400).json({ error }));
            }  
          break;

          case 0: // Changement de choix
           if (sauce.usersLiked.includes(req.body.userId)) { 
             Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Like annulé avec succès !' })) 
              .catch(error => res.status(400).json({ error }));
           } else if (sauce.usersDisliked.includes(req.body.userId)) { 
             Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.body.userId}, _id: req.params.id})
              .then(() => res.status(201).json({ message: 'Dislike annulé avec succès !' })) 
              .catch(error => res.status(400).json({ error }));
           }
         break;

       default: // 
         throw { error: "Une erreur est survenue !" };
   }
 })
 .catch(error => res.status(400).json({ error }));
};

// GET : Afficher toutes les sauces 
exports.getAllSauce = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


