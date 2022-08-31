const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: [ "String <userId>" ],
  usersDisliked: [ "String <userId>" ],
});

module.exports = mongoose.model('Post', postSchema);