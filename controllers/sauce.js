//import model
const Sauce = require('../models/SauceMod');


// createSauce POST
exports.createSauce = (req, res, next) => {

  console.log(req.body);
  const sauceObj =req.body.sauceUser;

  const sauceUser = new Sauce({
    ...sauceObj,
  });

  sauceUser.save()
  .then(() => { res.status(201).json({message: 'sauce save dans mongoDB !'})})
  .catch(error => { res.status(400).json( { error })})

};




//getOne id
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



// getAllSauces GET

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


