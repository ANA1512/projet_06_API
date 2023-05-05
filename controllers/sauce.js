//import model
const Sauce = require('../models/SauceMod');
const fs = require('fs');

// createSauce POST------------------------------
exports.createSauce = (req, res, next) => {

  const sauceObj =JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObj,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
  .then(() => { res.status(201).json({message: ' La sauce est enregistrée dans mongoDB !'})})
  .catch(error => { res.status(400).json( { error })})

};

// Update -----------------------------

exports.modifySauce = (req, res, next) => {
const sauceObj= req.file ? {
  ...JSON.parse(req.body.sauce),
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
} : { ...req.body };

delete sauceObj._userId;
Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
            res.status(401).json({ message : 'Not authorized'});
        } else {
          Sauce.updateOne({ _id: req.params.id}, { ...sauceObj, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });

};


//delete----------------------------------------------------
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};



// like sauce ---------------------------------
exports.likeSauce = (req, res, next) => {

  const likes = req.body.like;

  if(likes=== 1){
    Sauce.updateOne({_id: req.params.id}, {$inc:{likes :1 }, $push:{usersLiked: req.body.userId}, _id:req.params.id})
    .then(()=>res.status(200).json({message: "J'adore cette sauce !!!"}))
    .catch(error => res.status(400).json({ error }));

  }else if(likes=== -1){
    Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes :1 }, $push:{usersDisliked: req.body.userId}, _id:req.params.id})
    .then(()=>res.status(200).json({message: "Je déteste cette sauce!!!"}))
    .catch(error => res.status(400).json({ error }));

  } else{
    Sauce.findOne({_id: req.params.id})
    .then(sauce =>{
      if(sauce.usersLiked.indexOf(req.body.userId)!==-1){
        Sauce.updateOne({_id: req.params.id}, {$inc:{likes : -1 }, $pull:{usersLiked: req.body.userId}, _id:req.params.id})
        .then(()=>res.status(200).json({message: " Vous n'aimez plus cette sauce !!!"}))
        .catch(error => res.status(400).json({ error }));

      }else if(sauce.usersDisliked.indexOf(req.body.userId)!==-1){
        Sauce.updateOne({_id: req.params.id}, {$inc:{dislikes :-1 }, $pull:{usersDisliked: req.body.userId}, _id:req.params.id})
        .then(()=>res.status(200).json({message: "Vous aimez encore cette sauce ?!"}))
         .catch(error => res.status(400).json({ error }));
      }

    })
    .catch(error => res.status(400).json({ error }));

}

};

//getOne id------------------------------------------
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(
    (sauce) => {
      res.status(200).json(sauce);

    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// getAllSauces GET----------------------------------

exports.getAllSauces = (req, res, next) => {
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


