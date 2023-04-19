const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({

  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String},
  heat: { type: Number},
  likes: { type: Number, default: 0 },
  userId:{type: String},
  dislikes: { type: Number, default: 0 },
  userLiked:  [String],
  userDisliked:  [String]

});

module.exports = mongoose.model('Sauce', SauceSchema);
